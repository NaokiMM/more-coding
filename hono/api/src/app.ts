import { Hono } from "hono";
import { cors } from "hono/cors";
import { bodyLimitMiddleware } from "./middleware/bodyLimit.js";
import { createHealthRoutes } from "./routes/health.js";
import { createRunRoutes } from "./routes/run.js";

/** more-coding 用 Hono アプリ（ミドルウェアとルートの組み立てのみ） */
export function createApp() {
  const app = new Hono();
  app.use("*", cors());
  app.use("*", bodyLimitMiddleware);
  app.route("/health", createHealthRoutes());
  app.route("/run", createRunRoutes());
  return app;
}
