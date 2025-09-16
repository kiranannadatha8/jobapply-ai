import { Router } from "express";
import multer from "multer";
import {
  detectKind,
  extractTextFromDocx,
  extractTextFromPdf,
  extractTextFromTex,
} from "../lib/extract.js";
import { parseResumeText } from "../lib/openai.js";
import { ProfileSchema } from "../lib/schema.js";

const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10 MB
export const parseRouter = Router();

/**
 * POST /api/parse-resume
 * multipart/form-data with field 'file'
 */
parseRouter.post("/parse-resume", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "file is required" });

    const kind = detectKind(req.file.originalname, req.file.mimetype);
    if (kind === "unknown") {
      return res
        .status(415)
        .json({ error: "Unsupported file type. Use .pdf, .docx or .tex" });
    }

    let text = "";
    if (kind === "pdf") text = await extractTextFromPdf(req.file.buffer);
    else if (kind === "docx") text = await extractTextFromDocx(req.file.buffer);
    else if (kind === "tex") text = await extractTextFromTex(req.file.buffer);

    if (!text || text.trim().length < 40) {
      return res
        .status(422)
        .json({ error: "Could not extract text from resume" });
    }

    const raw = await parseResumeText(text);

    // Validate / coerce using Zod
    let parsed;
    try {
      parsed = ProfileSchema.parse(JSON.parse(raw));
    } catch (e) {
      // If model drifted, attempt a quick fix by wrapping minimal structure
      return res.status(502).json({
        error: "LLM output did not match schema",
        detail: String(e),
        raw,
      });
    }

    return res.json({ profile: parsed, meta: { chars: text.length, kind } });
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Internal error", detail: err?.message });
  }
});
