// app/api/jobs/route.ts
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 10;

  try {
    const jobs = await prisma.job.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        jobFunctions: true,
      },
      orderBy: {
        created: "desc",
      },
    });

    const totalCount = await prisma.job.count();
    const hasNextPage = totalCount > page * pageSize;

    return NextResponse.json({
      jobs,
      nextCursor: hasNextPage ? page + 1 : null,
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
