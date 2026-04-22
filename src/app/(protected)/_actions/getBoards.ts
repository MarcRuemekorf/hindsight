"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { board, boardColumn, postIt, boardMember, user } from "@/db/schema";
import { eq, desc, count, sql, and, gte, lte, type SQL } from "drizzle-orm";

type GetBoardsOptions = {
	page?: number;
	pageSize?: number;
	from?: Date;
	to?: Date;
};

export const getBoards = async ({ page = 1, pageSize = 15, from, to }: GetBoardsOptions = {}) => {
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

    const boards = await db
        .select({
            id: board.id,
            title: board.title,
            createdAt: board.createdAt,
            columnCount: sql<number>`coalesce(${columnCountSq.columnCount}, 0)`,
            postItCount: sql<number>`coalesce(${postItCountSq.postItCount}, 0)`,
            members: membersSq.members,
            totalCount: sql<number>`coalesce(${sql<number>`count(*) over()`}, 0)`,
        })
        .from(board)
        .leftJoin(columnCountSq, eq(board.id, columnCountSq.boardId))
        .leftJoin(postItCountSq, eq(board.id, postItCountSq.boardId))
        .leftJoin(membersSq, eq(board.id, membersSq.boardId))
        .where(and(
            eq(board.createdByUserId, session.user.id),
            from ? gte(board.createdAt, from) : undefined,
            to ? lte(board.createdAt, to) : undefined,
        ) as SQL)
        .orderBy(desc(board.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

    return { boards, totalCount: boards.length > 0 ? boards[0].totalCount : 0 };
};
