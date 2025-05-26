import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a new Prisma client instance
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const favoriteJobs = await prisma.job.findMany({
      where: {
        isFavorite: true,
      },
      include: {
        jobFunctions: true,
      },
      orderBy: {
        lastUpdated: "desc",
      },
    });

    return NextResponse.json({
      jobs: favoriteJobs,
      count: favoriteJobs.length,
    });
  } catch (error) {
    console.error("Error fetching favorite jobs:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorite jobs" },
      { status: 500 }
    );
  }
}
