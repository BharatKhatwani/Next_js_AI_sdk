import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await streamText({
      model: google("gemini-2.0-flash"),
      prompt,
    });

    // optional: log token usage
    result.usage.then((usage) => {
      console.log({
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    // ✅ MUST return a Response object
    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Streaming error:", error);
    return NextResponse.json(
      { error: error.message ?? "Something went wrong" },
      { status: 500 },
    );
  }
}
