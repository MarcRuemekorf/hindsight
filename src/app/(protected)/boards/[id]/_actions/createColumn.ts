"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { boardColumn, boardMember } from "@/db/schema";
import { and, eq, max } from "drizzle-orm";
import { randomBytes } from "crypto";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createColumnSchema = z.object({
    boardId: z.string().regex(/^[0-9a-f]{6}$/),
    title: z.string().min(1).max(100),
});

export const createColumn = async (input: z.infer<typeof createColumnSchema>) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");

    const parsed = createColumnSchema.safeParse(input);
    if (!parsed.success) return { error: z.treeifyError(parsed.error) };

    const { boardId, title } = parsed.data;

    const membership = await db
        .select({ role: boardMember.role })
        .from(boardMember)
        .where(and(eq(boardMember.boardId, boardId), eq(boardMember.userId, session.user.id)))
        .limit(1);

    if (membership.length === 0) return { error: "access_denied" as const };
    if (membership[0].role !== "owner") return { error: "forbidden" as const };

    const [{ maxPosition }] = await db
        .select({ maxPosition: max(boardColumn.position) })
        .from(boardColumn)
        .where(eq(boardColumn.boardId, boardId));

    const columnId = randomBytes(3).toString("hex");

    await db.insert(boardColumn).values({
        id: columnId,
        boardId,
        title,
        position: (maxPosition ?? -1) + 1,
    });

    revalidatePath(`/boards/${boardId}`);

    return columnId;
};