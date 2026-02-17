/**
 * more-coding-subscription-stop Lambda のユニットテスト
 * 実行: npm run test:lambda
 */
import { describe, it } from "node:test";
import assert from "node:assert";

const { handler } = await import(
  "../dev/more-coding-subscription-stop-dev/index.mjs"
);

describe("more-coding-subscription-stop handler", () => {
  it("handler が 200 と body を返す", async () => {
    const event = {};
    const res = await handler(event);
    assert.strictEqual(res.statusCode, 200);
    assert.ok(res.body);
    assert.strictEqual(JSON.parse(res.body), "Hello from Lambda!");
  });
});
