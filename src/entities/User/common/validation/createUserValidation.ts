'use client';

import { z } from 'zod';

export type CreateUserFormFields = z.infer<typeof createUserValidation>;

export const createUserValidation = z.object({
  email: z.string().email({ message: 'Inserisci una e-mail valida' }),
  name: z.string().min(4, 'Inserisci un nome di almeno 4 caratteri'),
  password: z.string().min(6, 'Inserisci una password di almeno 6 caratteri'),
});
