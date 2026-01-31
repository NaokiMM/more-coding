import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3オブジェクト用の安全な一意ID(UUID)生成に使用
import crypto from "crypto";

// DynamoDB操作をJSON形式で扱えるようにするためのDocumentClient
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
// S3操作用クライアント（IAMロールによる自動認証）
const s3 = new S3Client({});

// フロントのOrigin（CloudFront）
// 直書き禁止
const ORIGIN = "https://d1z9w64vvsvlia.cloudfront.net";

// フロントエンド（CloudFront配信）からのAPI呼び出しを成立させるために
// ブラウザからのクロスオリジンAPI呼び出しを許可するためのCORS設定
// Methodsが不足している。
const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

// Lambda → API Gateway のレスポンス形式を統一するためのJSONレスポンス生成ヘルパー
const json = (statusCode, bodyObj) => ({
  statusCode,
  headers: { "content-type": "application/json", ...corsHeaders },
  body: JSON.stringify(bodyObj),
});

// CORSの事前確認（preflight）リクエストに応答する
// ブラウザが本リクエストを送信できるようにするため
export const handler = async (event) => {
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  // リクエスト情報（メソッド・パス）と認証済みユーザー情報を取得
  const method = event?.requestContext?.http?.method;
  const path = event?.rawPath ?? "/";
  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  const sub = claims?.sub ?? null;
  const email = claims?.email ?? null;
  const name = claims?.name ?? null;

  // 未認証で呼ばれた場合（authorizer想定なら保険）
  if (!sub) {
    return json(401, { ok: false, message: "Unauthorized" });
  }

  // 環境変数からDBテーブル名とS3バケット名を取得
  const membersTable = process.env.MEMBERS_TABLE;
  const profileImagesBucket = process.env.PROFILE_IMAGES_BUCKET;

  // =========================
  // 1) 署名付きPUT URLを発行
  // POST /profile-image/presign
  // body: { contentType: "image/png" | "image/jpeg" | "image/webp" }
  // return: { key, uploadUrl }
  // 認証済みユーザーに対して、S3へ直接アップロードするための署名付きPUT URL（pre-signed URL）を発行するAPI
  // =========================
  if (method === "POST" && path === "/profile-image/presign") {
    if (!profileImagesBucket) {
      return json(500, { ok: false, message: "PROFILE_IMAGES_BUCKET is missing" });
    }

    let body = {};
    try {
      body = JSON.parse(event.body ?? "{}");
    } catch {
      return json(400, { ok: false, message: "Invalid JSON body" });
    }

    const contentType = body?.contentType;
    const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
    if (!allowed.has(contentType)) {
      return json(400, { ok: false, message: "Unsupported contentType" });
    }

    const ext = contentType.split("/")[1]; // jpeg/png/webp
    const id = crypto.randomUUID();
    const key = `profiles/${sub}/${id}.${ext}`;

    const cmd = new PutObjectCommand({
      Bucket: profileImagesBucket,
      Key: key,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    });

    const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 });

    return json(200, { ok: true, key, uploadUrl });
  }

  // =========================
  // 2) GET /me
  // 認証（Cognito）で得られるユーザーID（sub）を元に、
  // アプリ内ユーザーを一意に識別・管理するためのAPI
  // DynamoDBにユーザーレコードを保持し、
  // 初回アクセス時は最小限の初期状態を作成して返す
  // =========================

  // API Gatewayからのリクエストを受け取ったときの処理
  if (method === "GET" && path === "/me") {
    if (!membersTable) {
      return json(500, { ok: false, message: "MEMBERS_TABLE is missing" });
    }

    const key = { pk: `USER#${sub}`, sk: "PROFILE" };

    // ユーザーレコードを取得
    // どこから？Cognito？
    const got = await ddb.send(
      new GetCommand({
        TableName: membersTable,
        Key: key,
      })
    );

    // 新規ユーザーの場合
    if (!got.Item) {
      const item = { ...key, createdAt: new Date().toISOString() };
      await ddb.send(
        new PutCommand({
          TableName: membersTable,
          Item: item,
        })
      );

      // 新規ユーザーの場合
      return json(200, {
        ok: true,
        created: true,
        auth: { sub, name, email },
        item,
      });
    }

    // 既存ユーザーの場合
    return json(200, {
      ok: true,
      created: false,
      auth: { sub, name, email },
      item: got.Item,
    });
  }

  // その他
  return json(200, { ok: true, sub, note: "Try GET /me or POST /profile-image/presign" });
};