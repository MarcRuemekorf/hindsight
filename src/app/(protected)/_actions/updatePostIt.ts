"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { postIt } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { updatePostItSchema, type UpdatePostItSchema } from "./updatePostIt.schema";

export const updatePostIt = async (data: UpdatePostItSchema) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/login");

	const parsed = updatePostItSchema.safeParse(data);
	if (!parsed.success) return { error: "invalid_input" as const };

	const { postItId, title, content } = parsed.data;

	const updated = await db
		.update(postIt)
		.set({ title, content: content ?? null })
		.where(and(eq(postIt.id, postItId), eq(postIt.createdByUserId, session.user.id)));

	if (updated.rowCount === 0) return { error: "not_found" as const };

	revalidatePath("/post-its");
	revalidatePath("/");
	return "ok" as const;
};
