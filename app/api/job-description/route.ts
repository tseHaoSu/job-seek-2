import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CORESIGNAL_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 400 });
    }

    const requestBody = await request.json();
    const query = requestBody.query || {
      bool: {
        must: [
          { term: { application_active: 1 } },
          { term: { deleted: 0 } },
          { match: { company_url: "https://www.linkedin.com/company/amazon" } },
          { match: { title: "Engineer" } },
        ],
      },
    };

    const response = await axios({
      method: "post",
      url: "https://api.coresignal.com/cdapi/v2/job_base/search/es_dsl",
      headers: {
        apikey: apiKey,
        "Content-Type": "application/json",
      },
      data: { query },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        error: error.response?.data || "Error communicating with the API",
      },
      { status: 500 }
    );
  }
}
