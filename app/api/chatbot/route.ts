import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received:", body);

    if (!body) {
      return NextResponse.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }

    const response = await fetch("http://20.92.167.242:8001/chat_stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

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

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("text/event-stream")) {
      return new Response(response.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    } else if (
      contentType?.includes("text/plain") ||
      contentType?.includes("text/html")
    ) {
      const text = await response.text();
      const processedData = processStreamText(text);
      return NextResponse.json(processedData, { status: 200 });
    } else {
      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    }
  } catch (error) {
    console.error("CV generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate CV",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

function processStreamText(text: string) {
  const lines = text.split("\n");
  const dataLines = lines.filter((line) => line.startsWith("data: "));

  if (dataLines.length > 0) {
    const lastDataLine = dataLines[dataLines.length - 1];
    const jsonStr = lastDataLine.substring(6).trim();

    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return { result: jsonStr };
    }
  }

  return { result: text };
}
