import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server"; // ✅ needed for API response

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json(); 

    const result = await streamText({
      model: google("gemini-2.0-flash"), 
      prompt,
    });

    // ✅ Proper return for streaming response
    return result.toUIMessageStream();
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
