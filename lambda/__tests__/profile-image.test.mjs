/**
 * more-coding-profile-image Lambda のユニットテスト
 * 実行: npm run test:lambda
 */
import { describe, it } from "node:test";
import assert from "node:assert";

const { handler } = await import(
  "../dev/more-coding-profile-image-dev/index.mjs"
);

const eventBase = {
  requestContext: {
    http: { method: "GET", requestId: "test-id" },
    authorizer: { jwt: { claims: { sub: "user-123" } } },
  },
  rawPath: "/me/profile-image",
};

describe("more-coding-profile-image handler", () => {
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
    assert.strictEqual(JSON.parse(res.body).message, "Unauthorized");
  });

  it("PROFILE_IMAGES_BUCKET が未設定の場合は 500 を返す", async () => {
    delete process.env.PROFILE_IMAGES_BUCKET;
    const res = await handler(eventBase);
    assert.strictEqual(res.statusCode, 500);
    assert.ok(
      JSON.parse(res.body).message.includes("PROFILE_IMAGES_BUCKET")
    );
  });
});
