'use client';

import { z } from 'zod';

export type MyAccountFormFields = z.infer<typeof myAccountValidation>;

export const myAccountValidation = z.object({
  name: z.string().min(4),
  surname: z.string().min(4),
});
