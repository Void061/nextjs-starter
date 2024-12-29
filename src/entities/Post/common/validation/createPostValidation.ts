import { z } from 'zod';

export type CreatePostFormFields = z.infer<typeof createPostValidation>;

export const createPostValidation = z.object({
  title: z.string().min(4),
});
