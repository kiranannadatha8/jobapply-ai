import OpenAI from "openai";
import { ProfileJsonSchema } from "./schema.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

/**
 * Ask the model to emit STRICT JSON that matches our schema.
 * We use structured outputs / JSON mode per OpenAI docs.
 */
export async function parseResumeText(resumeText: string) {
  const system = [
    "You are a resume information extraction engine.",
    "Return ONLY valid JSON that matches the provided JSON schema.",
    "Never invent employment or degrees; prefer null/omissions over guesses.",
    "Normalize dates as free text from resume (e.g., 'Jan 2023 – Present').",
  ].join("\n");

  // Using Responses API shape via the official Node SDK
  // We ask for a single JSON object that conforms to ProfileJsonSchema
  const response = await client.chat.completions.create({
    model: MODEL,
    response_format: { type: "json_object" }, // structured JSON output
    messages: [
      { role: "system", content: system },
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              `Extract the following fields: basics{firstName,lastName,email,phone,address,linkedin,github,website},` +
              ` education[{school,degree,start,end}], experience[{company,title,start,end,bullets[]}], projects[{name,description,skills[]}], skills[]` +
              `\n\nRESUME:\n${resumeText}`,
          },
        ],
      },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  return raw;
}
