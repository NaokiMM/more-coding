// lambda/skillboost-billing/index.mjs
// passは/me/subscription GET
// 課金状態の取得

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ENV_NAME = "dev";
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// CloudFrontで許可するOrigin
const ORIGIN = process.env.ALLOWED_ORIGIN;

const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
};

const json = (statusCode, bodyObj) => ({
  statusCode,
  headers: { "content-type": "application/json", ...corsHeaders },
  body: JSON.stringify(bodyObj),
});

export const handler = async (event) => {
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  const method = event?.requestContext?.http?.method;
  const path = event?.rawPath ?? "/";

  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  const sub = claims?.sub ?? null;

  if (!sub) return json(401, { ok: false, message: "Unauthorized" });

  const membersTable = process.env.MEMBERS_TABLE;
  if (!membersTable) return json(500, { ok: false, message: "MEMBERS_TABLE is missing" });

  // =========================
  // GET
  // 課金状態を返す
  // =========================
  if (method === "GET" && path === "/me/subscription") {
    const key = { pk: `USER#${sub}`, sk: "PROFILE" };

    const got = await ddb.send(
      new GetCommand({
        TableName: membersTable,
        Key: key,
      })
    );

    if (!got.Item) {
      // /me がまだ叩かれてない等。ここでは free 扱いで返す（DBは作らない）
      return json(200, {
        ok: true,
        exists: false,
        billing: { membershipTier: "free", isPaid: false, paidAt: null },
      });
    }

    const item = got.Item;

    // 既存ユーザーで属性が無い場合でも安全に free 扱い
    const membershipTier = item.membershipTier ?? "free";
    const isPaid = item.isPaid ?? false;
    const paidAt = item.paidAt ?? null;

    return json(200, {
      ok: true,
      exists: true,
      billing: { membershipTier, isPaid, paidAt },
    });
  }

  return json(404, { ok: false, message: "Not Found" });
};
