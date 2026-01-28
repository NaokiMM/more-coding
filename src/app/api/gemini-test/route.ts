import { GoogleGenAI } from "@google/genai";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("GEMINI_API_KEY is missing", { status: 500 });
  }

  const ai = new GoogleGenAI({ apiKey });

  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [{ role: "user", parts: [{ text: "Say OK in Japanese." }] }],
  });

  return Response.json({ text: res.text });
}
