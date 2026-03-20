import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createSchema, createYoga } from "graphql-yoga";

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

function runStub(params: { code: string; language: string }) {
  // TODO: サンドボックス実行を実装したらここを置き換える
  return {
    success: true,
    stdout: "",
    stderr: "",
    executionTimeMs: 0,
    message: `code-executor: run stub (execution not implemented yet, language=${params.language})`,
  };
}

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
  if (language && typeof language !== "string") {
    return c.json({ error: "language must be a string" }, 400);
  }
  // TODO: 実際の実行はサンドボックス実装後に追加
  return c.json(runStub({ code, language: language ?? "typescript" }));
});

// GraphQL（最小構成だけ用意する）
const schema = createSchema({
  typeDefs: `
    type Health {
      status: String!
      service: String!
    }

    type RunResult {
      success: Boolean!
      stdout: String!
      stderr: String!
      executionTimeMs: Int!
      message: String!
    }

    type Query {
      health: Health!
    }

    type Mutation {
      run(code: String!, language: String): RunResult!
    }
  `,
  resolvers: {
    Query: {
      health: () => ({ status: "ok", service: "code-executor" }),
    },
    Mutation: {
      run: (_parent: unknown, args: { code: string; language?: string }) =>
        runStub({ code: args.code, language: args.language ?? "typescript" }),
    },
  },
});

const yoga = createYoga({
  schema,
  graphiql: true,
  // Node 環境で WHATWG Fetch を使うための補助（ReadableStream 問題を避ける）
  fetchAPI: {
    fetch: globalThis.fetch,
    Request: globalThis.Request,
    Response: globalThis.Response,
    ReadableStream: globalThis.ReadableStream,
  },
});

// Hono から GraphQL Yoga に委譲する
app.use("/graphql", async (c) =>
  yoga.handle({ request: c.req.raw }, {}) as unknown as Response,
);

serve({ fetch: app.fetch, port: PORT });
console.log(`code-executor listening on http://localhost:${PORT}`);
