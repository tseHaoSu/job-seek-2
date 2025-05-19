import { NextRequest } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const bodyText = await request.text();
    console.log("Received raw body:", bodyText);
    let body;
    try {
      body = JSON.parse(bodyText);
      console.log("Parsed body:", body);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON in request body",
          details:
            parseError instanceof Error
              ? parseError.message
              : "Unknown parsing error",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!body) {
      return new Response(JSON.stringify({ error: "Missing request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await axios({
      method: "post",
      url: "http://20.11.48.94:8001/chat_stream",
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "stream", 
    });
    return new Response(response.data, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    if (axios.isAxiosError(error) && error.response) {
      return new Response(
        JSON.stringify(error.response.data || { error: error.message }),
        {
          status: error.response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "Failed to process chat request",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
}
