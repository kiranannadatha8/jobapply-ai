import pdf from "pdf-parse";
import mammoth from "mammoth";

export async function extractTextFromPdf(buffer: Buffer) {
  const data = await pdf(buffer);
  return data.text;
}

export async function extractTextFromDocx(buffer: Buffer) {
  const res = await mammoth.extractRawText({ buffer });
  return res.value;
}

export async function extractTextFromTex(buffer: Buffer) {
  // Basic LaTeX → text: remove comments and commands
  let text = buffer.toString("utf8");
  text = text.replace(/%.*$/gm, ""); // comments
  text = text.replace(/\\[a-zA-Z]+(\[[^\]]*\])?(\{[^}]*\})?/g, " "); // commands
  text = text.replace(/\{|\}/g, " ");
  return text;
}

export function detectKind(filename?: string, mimetype?: string) {
  const name = (filename || "").toLowerCase();
  if (mimetype?.includes("pdf") || name.endsWith(".pdf")) return "pdf";
  if (mimetype?.includes("word") || name.endsWith(".docx")) return "docx";
  if (name.endsWith(".tex")) return "tex";
  return "unknown";
}
