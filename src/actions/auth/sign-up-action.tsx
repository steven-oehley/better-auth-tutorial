'use server';

import { redirect } from 'next/navigation';

import { APIError } from 'better-auth/api';
import z from 'zod';

import { auth } from '@/lib/auth';
import { signUpSchema } from '@/schemas/sign-up-schema';
import { type ActionState } from '@/types/types';

export const signUpAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const rawData = {
    email: formData.get('email')?.toString() ?? '',
    firstname: formData.get('firstname')?.toString() ?? '',
    lastname: formData.get('lastname')?.toString() ?? '',
    pwd: formData.get('pwd')?.toString() ?? '',
    pwdConfirm: formData.get('pwdConfirm')?.toString() ?? '',
  };

  const preservedData = {
    email: rawData.email,
    firstname: rawData.firstname,
    lastname: rawData.lastname,
  };

  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const treeifiedErrors = z.treeifyError(validatedFields.error);

    return {
      fieldErrors: {
        email: treeifiedErrors.properties?.email?.errors,
        firstname: treeifiedErrors.properties?.firstname?.errors,
        lastname: treeifiedErrors.properties?.lastname?.errors,
        pwd: treeifiedErrors.properties?.pwd?.errors,
        pwdConfirm: treeifiedErrors.properties?.pwdConfirm?.errors,
      },
      preservedData,
    };
  }

  const { firstname, lastname, email, pwd } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        name: `${firstname} ${lastname}`,
        password: pwd,
      },
    });
  } catch (error) {
    console.error('Sign up failed:', error);
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNPROCESSABLE_ENTITY':
          return {
            errorMessage: 'User already exists, try logging in instead.',
            preservedData,
          };
        case 'BAD_REQUEST':
          return {
            errorMessage: 'Invalid input, please check your details.',
            preservedData,
          };
        default:
          return {
            errorMessage:
              'An unexpected error occurred, please try again later.',
            preservedData,
          };
      }
    }
    return {
      errorMessage: 'Something went wrong. Please try again.',
      preservedData,
    };
  }

  redirect('/dashboard');
};
