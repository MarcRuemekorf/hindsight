import z from "zod";

export const createPostItSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().optional(),
});

export type CreatePostItSchema = z.infer<typeof createPostItSchema>;
