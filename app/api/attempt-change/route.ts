import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    // Update all quizzes to set attempt to false
    const updatedQuizzes = await prisma.quiz.updateMany({
      data: {
        attempt: false,
      },
    });
    // Update all modules to set attempt to false
    const updatedModules = await prisma.module.updateMany({
      data: {
        attempt: false,
      },
    });
    return NextResponse.json({
      message: `Successfully updated ${updatedQuizzes.count} quizzes and ${updatedModules.count} modules`,
      quizCount: updatedQuizzes.count,
      moduleCount: updatedModules.count,
    });
  } catch (error) {
    console.error("Failed to update attempt status:", error);
    return NextResponse.json(
      { message: "Failed to update attempt status" },
      { status: 500 }
    );
  }
}

//test router
export async function GET() {
  return NextResponse.json({ message: "Test route works" });
}
