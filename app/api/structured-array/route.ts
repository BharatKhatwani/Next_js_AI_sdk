import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { pokemonSchema } from "./schema";

export async function POST(req:Request){
    try {
        const {type} = await req.json();
         const result = streamObject({
        model: google("gemini-2.0-flash"),
      output: "array",
      schema: pokemonSchema,
      prompt: `Generate a list of 5 ${type} type pokemon`,
    });

    } catch (error) {
        console.error("Error generating pokemon:", error);
    return new Response("Failed to generate pokemon", { status: 500 });
    }
}