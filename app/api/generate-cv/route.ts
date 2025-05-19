import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate
    if (!body) {
      return NextResponse.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }
    console.log("Request body:", JSON.stringify(body, null, 2));
    const response = await axios.post(
      "http://20.11.48.94:8000/generate_cv",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("CV generation error:", error);

    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500;
      const errorMessage = error.response?.data || error.message;

      return NextResponse.json(
        {
          error: "Failed to generate ",
          details: errorMessage,
        },
        { status: statusCode }
      );
    }
    return NextResponse.json(
      {
        error: "Failed to generate CV",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "It works!" });
}
