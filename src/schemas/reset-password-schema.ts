import { z } from 'zod';

// Reset password schema with proper validation
export const resetPasswordSchema = z
  .object({
    pwd: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),
    pwdConfirm: z.string(),
  })
  .refine((data) => data.pwd === data.pwdConfirm, {
    message: "Passwords don't match",
    path: ['pwdConfirm'], // This will show the error on the confirm password field
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
