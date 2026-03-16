import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
const PORT = Number(process.env.PORT) || 4000;

app.use("*", cors());
app.use("*", async (c, next) => {
  if (c.req.method === "POST" && c.req.header("content-length")) {
    const len = parseInt(c.req.header("content-length") ?? "0", 10);
    if (len > 1024 * 1024) {
      return c.json({ error: "payload too large" }, 413);
    }
  }
  await next();
});

app.get("/health", (c) => {
  return c.json({ status: "ok", service: "code-executor" });
});

/**
 * コード実行 API（スタブ）
 * 今後: サンドボックスで TS/React を実行し、結果を返す
 */
app.post("/run", async (c) => {
  let body: { code?: string; language?: string };
  try {
    body = (await c.req.json()) ?? {};
  } catch {
    return c.json({ error: "invalid json body" }, 400);
  }
  const { code, language = "typescript" } = body;
  if (!code || typeof code !== "string") {
    return c.json({ error: "code is required (string)" }, 400);
  }
  // TODO: 実際の実行はサンドボックス実装後に追加
  return c.json({
    success: true,
    stdout: "",
    stderr: "",
    executionTimeMs: 0,
    message:
      "code-executor: run stub (execution not implemented yet)",
  });
});

serve({ fetch: app.fetch, port: PORT });
console.log(`code-executor listening on http://localhost:${PORT}`);
