"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { board, boardColumn, postIt, boardMember, user } from "@/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";

export const getRecentBoards = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const columnCountSq = db
    .select({ boardId: boardColumn.boardId, columnCount: count().as("column_count") })
    .from(boardColumn)
    .groupBy(boardColumn.boardId)
    .as("column_counts");

  const postItCountSq = db
    .select({ boardId: postIt.boardId, postItCount: count().as("post_it_count") })
    .from(postIt)
    .groupBy(postIt.boardId)
    .as("post_it_counts");

  const membersSq = db
    .select({
      boardId: boardMember.boardId,
      members: sql<{ name: string; image: string | null }[]>`
        json_agg(json_build_object('name', ${user.name}, 'image', ${user.image}))
      `.as("members"),
    })
    .from(boardMember)
    .innerJoin(user, eq(boardMember.userId, user.id))
    .groupBy(boardMember.boardId)
    .as("members_sq");

  return db
    .select({
      id: board.id,
      title: board.title,
      createdAt: board.createdAt,
      columnCount: sql<number>`coalesce(${columnCountSq.columnCount}, 0)`,
      postItCount: sql<number>`coalesce(${postItCountSq.postItCount}, 0)`,
      members: membersSq.members,
    })
    .from(board)
    .leftJoin(columnCountSq, eq(board.id, columnCountSq.boardId))
    .leftJoin(postItCountSq, eq(board.id, postItCountSq.boardId))
    .leftJoin(membersSq, eq(board.id, membersSq.boardId))
    .where(eq(board.createdByUserId, session.user.id))
    .orderBy(desc(board.createdAt))
    .limit(10);
};
