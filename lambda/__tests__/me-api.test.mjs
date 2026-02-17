/**
 * more-coding-me-api Lambda のユニットテスト
 * 実行: npm run test:lambda
 */
import { describe, it } from "node:test";
import assert from "node:assert";

const { handler } = await import("../dev/more-coding-me-api-dev/index.mjs");

const eventBase = {
  requestContext: {
    http: { method: "GET", requestId: "test-id" },
    authorizer: {
      jwt: {
        claims: { sub: "user-123", email: "u@ex.com", name: "User" },
      },
    },
  },
  rawPath: "/me",
};

describe("more-coding-me-api handler", () => {
  it("OPTIONS で 204 と CORS ヘッダを返す", async () => {
    const event = {
      ...eventBase,
      requestContext: {
        ...eventBase.requestContext,
        http: { ...eventBase.requestContext.http, method: "OPTIONS" },
      },
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 204);
    assert.ok(res.headers);
  });

  it("sub がない場合は 401 を返す", async () => {
    const event = {
      ...eventBase,
      requestContext: {
        ...eventBase.requestContext,
        authorizer: { jwt: { claims: {} } },
      },
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 401);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.ok, false);
    assert.strictEqual(body.message, "Unauthorized");
  });

  it("MEMBERS_TABLE が未設定の場合は 500 を返す", async () => {
    delete process.env.MEMBERS_TABLE;
    const res = await handler(eventBase);
    assert.strictEqual(res.statusCode, 500);
    const body = JSON.parse(res.body);
    assert.ok(body.message.includes("MEMBERS_TABLE"));
  });
});
