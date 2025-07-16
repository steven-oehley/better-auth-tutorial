import z from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email address'),
  pwd: z.string().min(1, 'Password is required'),
});
