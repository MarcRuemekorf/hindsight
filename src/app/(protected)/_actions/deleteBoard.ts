"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { board, boardMember } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const deleteBoardSchema = z.object({
	boardId: z.string().regex(/^[0-9a-f]{6}$/),
});

export const deleteBoard = async (input: z.infer<typeof deleteBoardSchema>) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/login");

	const parsed = deleteBoardSchema.safeParse(input);
	if (!parsed.success) return { error: "invalid_input" as const };

	const { boardId } = parsed.data;

	const membership = await db
		.select({ role: boardMember.role })
		.from(boardMember)
		.where(and(eq(boardMember.boardId, boardId), eq(boardMember.userId, session.user.id)))
		.limit(1);

	if (membership.length === 0) return { error: "access_denied" as const };
	if (membership[0].role !== "owner") return { error: "forbidden" as const };

	await db.delete(board).where(eq(board.id, boardId));

	revalidatePath("/boards");
	return "ok" as const;
};
