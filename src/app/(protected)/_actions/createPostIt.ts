"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { postIt } from "@/db/schema";
import { randomBytes } from "crypto";
import {
	createPostItSchema,
	type CreatePostItSchema,
} from "@/app/(protected)/_actions/createPostIt.schema";
import z from "zod";
import { revalidatePath } from "next/cache";

export const createPostIt = async (data: CreatePostItSchema) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) redirect("/login");

	const parseResult = createPostItSchema.safeParse(data);
	if (!parseResult.success) return { error: z.treeifyError(parseResult.error) };

	const postItId = randomBytes(3).toString("hex");

	await db.insert(postIt).values({
		id: postItId,
		title: parseResult.data.title,
		content: parseResult.data.content,
		createdByUserId: session.user.id,
	});

	revalidatePath("/post-its");
	return postItId;
};

