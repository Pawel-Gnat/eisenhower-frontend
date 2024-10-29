import { z } from 'zod';

export const TaskFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must be at least 1 character.',
  }),
});

export const AuthFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, {
    message: 'Password must be at least 4 characters.',
  }),
});
