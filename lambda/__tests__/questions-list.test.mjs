/**
 * more-coding-questions-list Lambda のユニットテスト
 * 実行: npm run test:lambda
 */
import { describe, it } from "node:test";
import assert from "node:assert";

const { handler } = await import(
  "../dev/more-coding-questions-list-dev/index.mjs"
);

describe("more-coding-questions-list handler", () => {
  it("OPTIONS で 204 を返す", async () => {
    const event = {
      requestContext: {
        http: { method: "OPTIONS" },
        authorizer: { jwt: { claims: {} } },
      },
      rawPath: "/",
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 204);
  });

  it("sub がない場合は 401 を返す", async () => {
    process.env.ALLOWED_ORIGIN = "https://example.com";
    const event = {
      requestContext: {
        http: { method: "GET" },
        authorizer: { jwt: { claims: {} } },
      },
      rawPath: "/",
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 401);
    assert.strictEqual(JSON.parse(res.body).message, "Unauthorized");
  });

  it("認証ありで未実装ルートは 404 を返す", async () => {
    process.env.ALLOWED_ORIGIN = "https://example.com";
    const event = {
      requestContext: {
        http: { method: "GET" },
        authorizer: { jwt: { claims: { sub: "user-123" } } },
      },
      rawPath: "/",
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 404);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.ok, false);
    assert.ok(body.note.includes("Implement"));
  });
});
