import { z } from 'zod';

export const formSchema = z.object({
  description: z.string().min(2).max(255),
  name: z.string().min(2).max(255),
  publicUrl: z.string().min(2).max(255)
});

export type FormSchema = typeof formSchema;
