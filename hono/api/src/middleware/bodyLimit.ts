import type { MiddlewareHandler } from "hono";

const MAX_BODY_BYTES = 1024 * 1024;

/** POST の Content-Length が上限を超える場合は 413 を返す */
export const bodyLimitMiddleware: MiddlewareHandler = async (c, next) => {
  if (c.req.method === "POST" && c.req.header("content-length")) {
    const len = parseInt(c.req.header("content-length") ?? "0", 10);
    if (len > MAX_BODY_BYTES) {
      return c.json({ error: "payload too large" }, 413);
    }
  }
  await next();
};
