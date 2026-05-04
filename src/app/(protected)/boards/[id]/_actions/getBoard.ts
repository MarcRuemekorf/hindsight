"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth";
import { db } from "@/db";
import { board, boardColumn, boardMember, postIt, user } from "@/db/schema";
import { and, eq, isNull, sql } from "drizzle-orm";
import { z } from "zod";

export const getBoard = async (boardId: string) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) redirect("/login");

    if (!/^[0-9a-f]{6}$/.test(boardId)) return { error: "not_found" as const };

    const membersSq = db
        .select({
            boardId: boardMember.boardId,
            members: sql<{ id: string; name: string; image: string | null; role: string }[]>`
                json_agg(
                    json_build_object(
                        'id',    ${user.id},
                        'name',  ${user.name},
                        'image', ${user.image},
                        'role',  ${boardMember.role}
                    )
                    ORDER BY ${boardMember.createdAt}
                )
            `.as("members"),
        })
        .from(boardMember)
		.where(eq(boardMember.boardId, boardId))
        .innerJoin(user, eq(boardMember.userId, user.id))
        .groupBy(boardMember.boardId)
        .as("members_sq");

    const postItsSq = db
        .select({
            columnId: postIt.columnId,
            postIts: sql<{ id: string; content: string; position: number; createdByUserId: string; createdByName: string }[]>`
                json_agg(
                    json_build_object(
                        'id',              ${postIt.id},
                        'content',         ${postIt.content},
                        'position',        ${postIt.position},
                        'createdByUserId', ${postIt.createdByUserId},
                        'createdByName',   ${user.name}
                    )
                    ORDER BY ${postIt.position}
                )
            `.as("post_its"),
        })
        .from(postIt)
        .innerJoin(user, eq(postIt.createdByUserId, user.id))
        .where(and(eq(postIt.boardId, boardId), isNull(postIt.archivedAt)))
        .groupBy(postIt.columnId)
        .as("post_its_sq");

    const columnsSq = db
        .select({
            boardId: boardColumn.boardId,
            columns: sql<
                {
                    id: string;
                    title: string;
                    position: number;
                    postIts: {
                        id: string;
                        content: string;
                        position: number;
                        createdByUserId: string;
                        createdByName: string;
                    }[];
                }[]
            >`
                json_agg(
                    json_build_object(
                        'id',       ${boardColumn.id},
                        'title',    ${boardColumn.title},
                        'position', ${boardColumn.position},
                        'postIts',  coalesce(${postItsSq.postIts}, '[]'::json)
                    )
                    ORDER BY ${boardColumn.position}
                )
            `.as("columns"),
        })
        .from(boardColumn)
        .leftJoin(postItsSq, eq(boardColumn.id, postItsSq.columnId))
        .where(eq(boardColumn.boardId, boardId))
        .groupBy(boardColumn.boardId)
        .as("columns_sq");

    const [membershipRows, boardRows] = await Promise.all([
        db
            .select({ role: boardMember.role })
            .from(boardMember)
            .where(and(eq(boardMember.boardId, boardId), eq(boardMember.userId, session.user.id)))
            .limit(1),
        db
            .select({
                id: board.id,
                title: board.title,
                createdAt: board.createdAt,
                createdByUserId: board.createdByUserId,
                members: membersSq.members,
                columns: columnsSq.columns,
            })
            .from(board)
            .leftJoin(membersSq, eq(board.id, membersSq.boardId))
            .leftJoin(columnsSq, eq(board.id, columnsSq.boardId))
            .where(eq(board.id, boardId))
            .limit(1),
    ]);

    if (membershipRows.length === 0) return { error: "access_denied" as const };
    if (boardRows.length === 0) return { error: "not_found" as const };

    const boardData = boardRows[0];

    return {
        ...boardData,
            currentUserRole: z.enum(["owner", "member"]).catch("member").parse(membershipRows[0].role),
            members: boardData.members ?? [],
            columns: boardData.columns ?? [],
    };
};

export type GetBoardResult = Awaited<ReturnType<typeof getBoard>>;
export type BoardColumn = Extract<GetBoardResult, { columns: unknown[] }>["columns"][number];