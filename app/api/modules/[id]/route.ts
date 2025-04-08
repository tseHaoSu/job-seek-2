import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const body = await request.json();
    const { id } = await params;
    const foundModule = await prisma.module.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!foundModule) {
      return NextResponse.json(
        { message: "Module not found" },
        { status: 404 }
      );
    }

    // Update module attempt status
    const updatedModule = await prisma.module.update({
      where: {
        id: parseInt(id),
      },
      data: {
        attempt: true,
      },
    });

    return NextResponse.json(updatedModule);
  } catch (error) {
    console.error("Failed to update module attempt status:", error);
    return NextResponse.json(
      { message: "Failed to update module attempt status" },
      { status: 500 }
    );
  }
}

//test router
export async function GET() {
  return NextResponse.json({ message: "Test route works" });
}
