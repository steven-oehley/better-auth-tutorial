/* eslint-disable security/detect-object-injection */
'use server';

import { redirect } from 'next/navigation';

import { APIError } from 'better-auth/api';
import type z from 'zod';

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

  function mapFieldErrors(
    errors: z.ZodIssue[],
  ): Record<string, string[] | undefined> {
    const fieldErrors: Record<string, string[] | undefined> = {};
    const allowedFields = [
      'email',
      'firstname',
      'lastname',
      'pwd',
      'pwdConfirm',
    ];
    for (const err of errors) {
      const field = String(err.path[0]);
      if (allowedFields.includes(field)) {
        fieldErrors[field] ??= [];
        fieldErrors[field]?.push(err.message);
      }
    }
    return fieldErrors;
  }

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error?.errors
      ? mapFieldErrors(validatedFields.error.errors)
      : {};

    return {
      fieldErrors: {
        email: fieldErrors.email,
        firstname: fieldErrors.firstname,
        lastname: fieldErrors.lastname,
        pwd: fieldErrors.pwd,
        pwdConfirm: fieldErrors.pwdConfirm,
      },
      preservedData,
    };
  }

  const { firstname, lastname, email, pwd } = validatedFields.data;

  try {
    await auth.api.signUpEmail({
      body: {
        callbackURL: '/dashboard',
        email,
        name: `${firstname} ${lastname}`,
        password: pwd, // Optional, where to redirect after sign up
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

  redirect('/sign-up-success');
};
