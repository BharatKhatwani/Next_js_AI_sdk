import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  try {
     const { prompt } = await req.json();
    const { text } = await generateText({
      model: google("gemini-2.0-flash"), // ✅ use a valid model id
      prompt,
    });

    return NextResponse.json({ text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
