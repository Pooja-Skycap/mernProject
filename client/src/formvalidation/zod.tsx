import { z } from "zod";

export const zodSchema = z.object({
  title: z
    .string()
    .min(1, "Title cannot be empty")
    .max(100, "Title can be at most 100 characters long"),

  description: z.string().optional(),
  images: z.array(z.instanceof(File)).optional(),
});

export type CreateEventData = z.infer<typeof zodSchema>;
