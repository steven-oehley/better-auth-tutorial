'use server';

import { redirect } from 'next/navigation';

import { APIError } from 'better-auth/api';
import z from 'zod';

import { auth } from '@/lib/auth';
import { resetPasswordSchema } from '@/schemas/reset-password-schema';
import { type ActionState } from '@/types/types';

export const resetPasswordAction = async (
  token: string,
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const rawData = {
    pwd: formData.get('pwd')?.toString() ?? '',
    pwdConfirm: formData.get('pwdConfirm')?.toString() ?? '',
  };

  // Validate with schema using your pattern
  const validatedFields = resetPasswordSchema.safeParse(rawData);

  if (!validatedFields.success) {
    const treeifiedErrors = z.treeifyError(validatedFields.error);

    return {
      fieldErrors: {
        pwd: treeifiedErrors.properties?.pwd?.errors,
        pwdConfirm: treeifiedErrors.properties?.pwdConfirm?.errors,
      },
    };
  }

  const { pwd } = validatedFields.data;

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: pwd,
        token, // Required for server actions
      },
    });
  } catch (error) {
    console.error('Reset password failed:', error);

    if (error instanceof APIError) {
      switch (error.status) {
        case 'UNAUTHORIZED':
          return {
            errorMessage:
              'Invalid or expired reset token. Please request a new password reset.',
          };
        case 'BAD_REQUEST':
          return {
            errorMessage:
              'Invalid input. Please check your password requirements.',
          };
        case 'FORBIDDEN':
          return {
            errorMessage:
              'Reset token has expired. Please request a new password reset.',
          };
        default:
          return {
            errorMessage:
              'An unexpected error occurred, please try again later.',
          };
      }
    }

    return {
      errorMessage: 'Error resetting password. Please try again.',
    };
  }

  redirect('/login?message=password-reset-success');
};
