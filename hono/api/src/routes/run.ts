import { Hono } from "hono";

/** コード実行（将来のサンドボックス用スタブ）。マウント先は `/run` */
export function createRunRoutes() {
  const r = new Hono();
  r.post("/", async (c) => {
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
    return c.json({
      success: true,
      language,
      stdout: "",
      stderr: "",
      executionTimeMs: 0,
      message: "run stub (execution not implemented yet)",
    });
  });
  return r;
}
