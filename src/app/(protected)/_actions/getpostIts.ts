"use server";

import { auth } from "@/utils/auth";
import { db } from "@/db";
import { postIt } from "@/db/schema";
import { eq, desc, sql, and, gte, lte, isNull, type SQL } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type GetPostItsOptions = { page?: number; pageSize?: number; from?: Date; to?: Date };

export const getPostIts = async ({ page = 1, pageSize = 15, from, to }: GetPostItsOptions = {}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session) redirect("/login");

  const rows = await db
    .select({
      id: postIt.id,
      title: postIt.title,
      content: postIt.content,
      boardId: postIt.boardId,
      createdAt: postIt.createdAt,
      totalCount: sql<number>`count(*) over()`,
    })
    .from(postIt)
    .where(and(
      eq(postIt.createdByUserId, session.user.id),
      isNull(postIt.archivedAt),
      from ? gte(postIt.createdAt, from) : undefined,
      to   ? lte(postIt.createdAt, to)   : undefined,
    ) as SQL)
    .orderBy(desc(postIt.createdAt))
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  return {
    postIts: rows,
    totalCount: rows.length > 0 ? rows[0].totalCount : 0,
  };
};