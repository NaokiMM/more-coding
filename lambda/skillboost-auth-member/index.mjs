import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

// DynamoDB用の“操作役インスタンス”を作ってる
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// 直書き禁止（いったん現状踏襲）
const ORIGIN = process.env.ALLOWED_ORIGIN;

// CORS設定
const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
};

// API Gateway（HTTP API）に返すレスポンスの“形”を毎回そろえるための関数
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

  // HTTPメソッドとパスを取得（Lambda内でAPIルーティングするため）
  const method = event?.requestContext?.http?.method;
  const path = event?.rawPath ?? "/";
  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  const sub = claims?.sub ?? null;
  const email = claims?.email ?? null;
  const name = claims?.name ?? null;

  if (!sub) return json(401, { ok: false, message: "Unauthorized" });

  // 環境変数から DynamoDB のテーブル名を取得している
  const membersTable = process.env.MEMBERS_TABLE;
  if (!membersTable) return json(500, { ok: false, message: "MEMBERS_TABLE is missing" });

  // =========================
  // GET /me
  // ユーザー情報を取得する
  // =========================
  if (method === "GET" && path === "/me") {
    const key = { pk: `USER#${sub}`, sk: "PROFILE" };

    // DynamoDBからユーザー情報を取得
    const got = await ddb.send(
      new GetCommand({
        TableName: membersTable,
        Key: key,
      })
    );

    // 初回アクセス → レコード作成
    if (!got.Item) {
      const now = new Date().toISOString();

      const item = {
        ...key,
        createdAt: now,
        updatedAt: now,

        // 有料会員属性
        membershipTier: "free", // "free" | "paid" など
        isPaid: false,          // boolean
        paidAt: null,           // string(ISO) | null
      };

      // DynamoDBに新規ユーザー情報を保存
      await ddb.send(
        new PutCommand({
          TableName: membersTable,
          Item: item,
        })
      );

      // 新規ユーザー
      return json(200, { ok: true, created: true, auth: { sub, name, email }, item });
    }

    // 既存ユーザー
    return json(200, { ok: true, created: false, auth: { sub, name, email }, item: got.Item });
  }

  // 404 Not Found
  return json(404, { ok: false, message: "Not Found" });
};
