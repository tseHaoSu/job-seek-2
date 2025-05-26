// app/api/jobs/route.ts
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 10;
  const search = searchParams.get("search") || "";
  const location = searchParams.get("location") || "";
  const jobType = searchParams.get("jobType") || "";

  try {
    let whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { companyName: { contains: search, mode: "insensitive" } },
      ];
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (jobType) {
      whereClause.employmentType = {
        equals: jobType,
        mode: "insensitive",
      };
    }
    const jobs = await prisma.job.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        jobFunctions: true,
      },
      orderBy: {
        created: "desc",
      },
    });

    const totalCount = await prisma.job.count({ where: whereClause });
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
