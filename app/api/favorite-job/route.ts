import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const offset = (page - 1) * limit;

    // Build where clause for search
    let whereClause = {};
    if (search) {
      whereClause = {
        job: {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { companyName: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
          ],
        },
      };
    }

    const favorites = await prisma.favoriteJob.findMany({
      where: whereClause,
      include: {
        job: {
          include: {
            jobFunctions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: limit,
    });

    const total = await prisma.favoriteJob.count({
      where: whereClause,
    });

    return NextResponse.json({
      success: true,
      favorites: favorites.map((fav) => ({
        favoriteId: fav.id,
        favoritedAt: fav.createdAt,
        job: fav.job,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching favorite jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
