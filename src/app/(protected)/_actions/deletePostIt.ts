"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { postIt } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const deletePostItSchema = z.object({
    postItId: z.string().regex(/^[0-9a-f]{6}$/),
});

export const deletePostIt = async (input: z.infer<typeof deletePostItSchema>) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");

    const parsed = deletePostItSchema.safeParse(input);
    if (!parsed.success) return { error: "invalid_input" as const };

    const { postItId } = parsed.data;

    const deleted = await db
        .delete(postIt)
        .where(and(eq(postIt.id, postItId), eq(postIt.createdByUserId, session.user.id)));

    if (deleted.rowCount === 0) return { error: "not_found" as const };

    revalidatePath("/post-its");
    return "ok" as const;
};
