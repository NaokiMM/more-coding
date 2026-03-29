import { Hono } from "hono";

/** マウント先が `/health` のためハンドラは `/` */
export function createHealthRoutes() {
  const r = new Hono();
  r.get("/", (c) => {
    return c.json({
      status: "ok",
      service: process.env.SERVICE_NAME ?? "more-coding-api",
    });
  });
  return r;
}
