'use server';

import { auth } from '@/lib/auth';
import { type ActionState } from '@/types/types';

export const forgotPasswordAction = async (
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const email = formData.get('email')?.toString() ?? '';
    if (!email) {
      return {
        errorMessage: 'Email is required.',
      };
    }

    await auth.api.forgetPassword({
      body: {
        email: formData.get('email')?.toString() ?? '',
        redirectTo: '/reset-password',
      },
    });
  } catch (error) {
    console.error('Reset password failed:', error);
    return {
      errorMessage: 'An unexpected error occurred, please try again later.',
    };
  }

  return {
    successMessage:
      'If an account with that email exists, a reset link has been sent.',
  };
};
