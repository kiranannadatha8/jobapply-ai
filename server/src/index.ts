import "dotenv/config";
import express from "express";
import cors from "cors";
import { parseRouter } from "./routes/parse.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "*" })); // tighten in prod
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api", parseRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
