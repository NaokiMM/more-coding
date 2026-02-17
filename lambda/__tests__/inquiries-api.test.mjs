/**
 * more-coding-inquiries-api Lambda のユニットテスト
 * 実行: npm run test:lambda
 */
import { describe, it } from "node:test";
import assert from "node:assert";

const { handler } = await import("../dev/more-coding-inquiries-api-dev/index.mjs");

describe("more-coding-inquiries-api handler", () => {
  it("OPTIONS で 200 を返す", async () => {
    const event = {
      requestContext: { http: { method: "OPTIONS" } },
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 200);
  });

  it("FROM_EMAIL / TO_EMAIL が未設定の場合は 500 を返す", async () => {
    delete process.env.FROM_EMAIL;
    delete process.env.TO_EMAIL;
    const event = {
      requestContext: { http: { method: "POST" } },
      body: JSON.stringify({
        name: "Test",
        email: "test@example.com",
        category: "その他",
        subject: "件名",
        message: "10文字以上のメッセージ本文です",
      }),
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 500);
    const body = JSON.parse(res.body);
    assert.ok(body.message.includes("FROM_EMAIL"));
  });

  it("必須項目不足で 400 を返す", async () => {
    process.env.FROM_EMAIL = "from@example.com";
    process.env.TO_EMAIL = "to@example.com";
    const event = {
      requestContext: { http: { method: "POST" } },
      body: JSON.stringify({ name: "Test" }),
    };
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 400);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.ok, false);
  });
});
