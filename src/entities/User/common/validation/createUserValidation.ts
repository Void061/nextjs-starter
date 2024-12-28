import { z } from 'zod';

export type CreateUserFormFields = z.infer<typeof createUserValidation>;

export const createUserValidation = z.object({
  email: z.string().email(),
  name: z.string().min(4),
  password: z.string().min(6),
});
