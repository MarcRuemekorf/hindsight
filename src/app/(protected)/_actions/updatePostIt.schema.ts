import z from "zod";

export const updatePostItSchema = z.object({
	postItId: z.string().regex(/^[0-9a-f]{6}$/),
	title: z.string().min(1, "Title is required."),
	content: z.string().optional(),
});

export type UpdatePostItSchema = z.infer<typeof updatePostItSchema>;
