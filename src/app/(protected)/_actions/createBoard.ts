"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { board, boardMember } from "@/db/schema";
import { randomUUID } from "crypto";
import {
  createBoardSchema,
  type CreateBoardSchema,
} from "@/app/(protected)/_actions/createBoard.schema";
import z from "zod";

export const createBoard = async (data: CreateBoardSchema) => {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log("Session:", session);
  if (!session) redirect("/login");

  const parseResult = createBoardSchema.safeParse(data);
  if (!parseResult.success) return { error: z.treeifyError(parseResult.error) };

  const boardId = randomUUID();

  await db.transaction(async (tx) => {
    await tx.insert(board).values({
      id: boardId,
      title: parseResult.data.title,
      createdByUserId: session.user.id,
    });
    await tx.insert(boardMember).values({
      boardId,
      userId: session.user.id,
      role: "owner",
    });
  });

  return boardId;
};
