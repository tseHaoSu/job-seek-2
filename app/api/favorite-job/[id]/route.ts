import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const existingFavorite = await prisma.favoriteJob.findUnique({
        where: { jobId: jobId },
        include: { job: true }, 
    });

    if (existingFavorite) {
      return NextResponse.json(
        { error: "Job already in favorites" },
        { status: 409 }
      );
    }

    const favorite = await prisma.favoriteJob.create({
      data: { jobId: jobId },
      include: { job: true }, 
    });

    return NextResponse.json({
      success: true,
      message: "Job added to favorites",
      favorite,
    });
  } catch (error) {
    console.error("Error adding job to favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const jobId = parseInt(id);

    if (isNaN(jobId)) {
      return NextResponse.json({ error: "Invalid job ID" }, { status: 400 });
    }

    const deletedFavorite = await prisma.favoriteJob.deleteMany({
      where: {
        jobId: jobId,
      },
    });

    if (deletedFavorite.count === 0) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job removed from favorites",
      deletedCount: deletedFavorite.count,
    });
  } catch (error) {
    console.error("Error removing job from favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


