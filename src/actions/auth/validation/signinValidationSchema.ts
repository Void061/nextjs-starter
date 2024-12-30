'use client';

import { z } from 'zod';

export type SigninFormFields = z.infer<typeof signinValidation>;

export const signinValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
