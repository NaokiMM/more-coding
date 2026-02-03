import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const s3 = new S3Client({});

// 直書き禁止（いったん現状踏襲）
const ORIGIN = "https://d1z9w64vvsvlia.cloudfront.net";

const corsHeaders = {
  "Access-Control-Allow-Origin": ORIGIN,
  "Access-Control-Allow-Headers": "content-type,authorization",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
};

const json = (statusCode, bodyObj) => ({
  statusCode,
  headers: { "content-type": "application/json", ...corsHeaders },
  body: JSON.stringify(bodyObj),
});

export const handler = async (event) => {
  // CORS preflight (OPTIONS): ブラウザの事前確認用。実処理はしない
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  // HTTPメソッド取得
  const method = event?.requestContext?.http?.method;
  // ルーティング用のパスを取得
  const path = event?.rawPath ?? "/";
  // Cognitoで認証 → ブラウザがJWTをAuthorizationヘッダで送信 → API Gatewayが検証 → 検証済みclaimsをLambdaで利用
  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  // ログインユーザーIDを取り出す
  const sub = claims?.sub ?? null;

  // 未認証で呼ばれた場合（authorizer想定なら保険）
  if (!sub) {
    return json(401, { ok: false, message: "Unauthorized" });
  }

  // 環境変数からS3バケット名を取得
  const bucket = process.env.PROFILE_IMAGES_BUCKET;
  // S3バケット名が設定されていない場合はエラー
  if (!bucket) return json(500, { ok: false, message: "PROFILE_IMAGES_BUCKET is missing" });

  // =========================
  // 1) 署名付きPUT URLを発行
  // POST /profile-image/presign
  // body: { contentType: "image/png" | "image/jpeg" | "image/webp" }
  // return: { key, uploadUrl }
  // 認証済みユーザーに対して、S3へ直接アップロードするための署名付きPUT URL（pre-signed URL）を発行するAPI
  // =========================
  if (method === "POST" && path === "/profile-image/presign") {
    let body = {};
    try {
      body = JSON.parse(event.body ?? "{}");
    } catch {
      return json(400, { ok: false, message: "Invalid JSON body" });
    }

    // リクエストボディからcontentTypeを取得
    const contentType = body?.contentType;
    // 許可されたcontentTypeのみを許可
    const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
    // 許可されたcontentTypeでない場合はエラー
    if (!allowed.has(contentType)) {
      return json(400, { ok: false, message: "Unsupported contentType" });
    }

    // ファイル拡張子を取得
    const ext = contentType.split("/")[1]; // jpeg/png/webp
    // ファイルIDを生成
    const id = crypto.randomUUID();
    // ファイルキーを生成
    const key = `profiles/${sub}/${id}.${ext}`;

    // S3へのPUTコマンドを作成
    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    });

    // 署名付きPUT URLを生成
    const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 });
    // 成功レスポンスを返す
    return json(200, { ok: true, key, uploadUrl });
  }

  // =========================
  // 2) プロフィール画像取得
  // GET /profile-image
  // =========================
  if (method === "GET" && path === "/profile-image") {
    const key = `profiles/${sub}/latest.webp`;
    const url = `${ORIGIN}/${key}`;

    return json(200, {
      ok: true,
      key,
      url,
    });
  }

  // 未定義のパスが呼ばれた場合はエラー
  return json(404, { ok: false, message: "Not Found" });
};
