import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "code-executor" });
});

/**
 * コード実行 API（スタブ）
 * 今後: サンドボックスで TS/React を実行し、結果を返す
 */
app.post("/run", (req, res) => {
  const { code, language = "typescript" } = req.body ?? {};
  if (!code || typeof code !== "string") {
    res.status(400).json({ error: "code is required (string)" });
    return;
  }
  // TODO: 実際の実行はサンドボックス実装後に追加
  res.json({
    success: true,
    stdout: "",
    stderr: "",
    executionTimeMs: 0,
    message: "code-executor: run stub (execution not implemented yet)",
  });
});

app.listen(PORT, () => {
  console.log(`code-executor listening on http://localhost:${PORT}`);
});
