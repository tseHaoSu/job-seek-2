import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received CV generation request:", body);
    // Validate the incoming data
    if (!body) {
      return NextResponse.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }
    // Make a request to the external API
    const response = await fetch("http://20.5.25.37:8000/generate_cv", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("External API error:", errorText);
      return NextResponse.json(
        {
          error: `Failed to generate CV: ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }
    // Get the response data from the external API
    const data = await response.json();
    // Return the CV data from the external API
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("CV generation error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate CV", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

//test get method
export async function GET() {
  return NextResponse.json({ message: "It works!" });
}

