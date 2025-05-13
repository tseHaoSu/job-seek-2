import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const bodyText = await request.text();
    console.log("Received raw body:", bodyText);
    
    // Safely parse JSON
    let body;
    try {
      body = JSON.parse(bodyText);
      console.log("Parsed body:", body);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON in request body",
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Validate the incoming data
    if (!body) {
      return new Response(
        JSON.stringify({ error: "Missing request body" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Forward the request 
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
      return new Response(
        JSON.stringify({
          error: `Failed to chat: ${response.statusText}`,
          details: errorText,
        }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }


    // Return the stream 
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
