import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.email('Invalid email address').trim(),
    firstname: z.string().trim().min(1, 'First name is required').max(50),
    lastname: z.string().trim().min(1, 'Last name is required').max(50),
    pwd: z
      .string()
      .trim()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters'),
    pwdConfirm: z.string(),
  })
  .refine((data) => data.pwd === data.pwdConfirm, {
    message: "Passwords don't match",
    path: ['pwdConfirm'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
