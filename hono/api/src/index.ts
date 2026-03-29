import { serve } from "@hono/node-server";
import { createApp } from "./app.js";

const PORT = Number(process.env.PORT) || 4000;

const app = createApp();
serve({ fetch: app.fetch, port: PORT });
console.log(`more-coding-api listening on http://localhost:${PORT}`);
