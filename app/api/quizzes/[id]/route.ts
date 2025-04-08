import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const body = await request.json();
    const { id } = await params;
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }  
    // Update quiz attempt status
    const updatedQuiz = await prisma.quiz.update({
      where: {
        id: parseInt(id),
      },
      data: {
        attempt: true,
      },
    });
    
    return NextResponse.json(updatedQuiz);
  } catch (error) {
    console.error("Failed to update quiz attempt status:", error);
    return NextResponse.json(
      { message: "Failed to update quiz attempt status" },
      { status: 500 }
    );
  }
}

//test router
export async function GET() {
  return NextResponse.json({ message: "Test route works" });
}