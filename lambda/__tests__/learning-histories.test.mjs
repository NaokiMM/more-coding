/**
 * more-coding-learning-histories Lambda のユニットテスト
 * 実行: npm run test:lambda
 */
import { describe, it } from "node:test";
import assert from "node:assert";

const { handler } = await import(
  "../dev/more-coding-learning-histories-dev/index.mjs"
);

const eventBase = {
  requestContext: {
    http: { method: "GET", path: "/me/learning-histories" },
    authorizer: { jwt: { claims: { sub: "user-123" } } },
  },
};

describe("more-coding-learning-histories handler", () => {
  it("OPTIONS で 204 を返す", async () => {
    const event = {
      ...eventBase,
      requestContext: {
        ...eventBase.requestContext,
        http: { ...eventBase.requestContext.http, method: "OPTIONS" },
      },
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 204);
  });

  it("PROGRESS_TABLE が未設定の場合は 500 を返す", async () => {
    delete process.env.PROGRESS_TABLE;
    const res = await handler(eventBase);
    assert.strictEqual(res.statusCode, 500);
    const body = JSON.parse(res.body);
    assert.ok(body.message.includes("PROGRESS_TABLE"));
  });

  it("sub がない場合は 401 を返す", async () => {
    process.env.PROGRESS_TABLE = "progress-table";
    const event = {
      ...eventBase,
      requestContext: {
        ...eventBase.requestContext,
        authorizer: { jwt: { claims: {} } },
      },
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(JSON.parse(res.body).message, "Unauthorized");
  });
});
