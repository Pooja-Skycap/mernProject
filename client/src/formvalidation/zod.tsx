import { z } from 'zod';

export const zodSchema = z.object({
    title: z.string()
      .min(1, 'Title cannot be empty')
      .max(100, 'Title can be at most 100 characters long')
  });