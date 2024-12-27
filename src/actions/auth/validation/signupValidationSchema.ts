'use client';

import { z } from 'zod';

export type SignupFormFields = z.infer<typeof signupValidation>;

export const signupValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
