'use server';

import { redirect } from 'next/navigation';

import { APIError } from 'better-auth/api';
import z from 'zod';

import { auth } from '@/lib/auth';
import { signInSchema } from '@/schemas/sign-in-schema';
import { type ActionState } from '@/types/types';

export const signInAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const rawData = {
    email: formData.get('email')?.toString() ?? '',
    pwd: formData.get('pwd')?.toString() ?? '',
  };

  const validatedFields = signInSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const treeifiedErrors = z.treeifyError(validatedFields.error);

    return {
      fieldErrors: {
        email: treeifiedErrors.properties?.email?.errors,
        pwd: treeifiedErrors.properties?.pwd?.errors,
      },
    };
  }

  const { email, pwd } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password: pwd,
      },
    });
  } catch (error) {
    console.error('Sign up failed:', error);
    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNAUTHORIZED':
          return {
            errorMessage:
              'Invalid credentials. Please check your email and password.',
          };
        case 'BAD_REQUEST':
          return {
            errorMessage: 'Invalid input, please check your details.',
          };
        default:
          return {
            errorMessage:
              'An unexpected error occurred, please try again later.',
          };
      }
    }
    return {
      errorMessage: 'Error signing in. Please try again.',
    };
  }

  redirect('/dashboard');
};
