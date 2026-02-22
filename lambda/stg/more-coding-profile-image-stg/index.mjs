import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const ENV_NAME = "stg";
const s3 = new S3Client({});

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

  // HTTP API(v2) 前提
  const method = event?.requestContext?.http?.method;
  const path = event?.rawPath ?? "/";

  // JWT Authorizer で検証済みの claims を取得
  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  const sub = claims?.sub ?? null;

  if (!sub) {
    return json(401, { ok: false, message: "Unauthorized" });
  }

  const bucket = process.env.PROFILE_IMAGES_BUCKET;
  if (!bucket) return json(500, { ok: false, message: "PROFILE_IMAGES_BUCKET is missing" });

  // =========================
  // POST
  // 署名付きPUT URLを発行（S3へ直接アップロードするため）
  // body: { contentType: "image/png" | "image/jpeg" | "image/webp" }
  // return: { key, uploadUrl }
  // =========================
  if (method === "POST" && path === "/me/profile-image") {
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
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    });

    const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 });

    return json(200, { ok: true, key, uploadUrl });
  }

  // =========================
  // PUT
  // アップロード完了の「確定」(commit) 用
  // いったん最小で 200 を返すだけ（後でS3 CopyObject/DB保存に拡張）
  // body例: { key: "profiles/{sub}/{id}.webp" }
  // =========================
  if (method === "PUT" && path === "/me/profile-image") {
    let body = {};
    try {
      body = JSON.parse(event.body ?? "{}");
    } catch {
      return json(400, { ok: false, message: "Invalid JSON body" });
    }

    const key = body?.key;
    if (!key || typeof key !== "string") {
      return json(400, { ok: false, message: "key is required" });
    }

    // TODO: ここで
    // - key が profiles/${sub}/ で始まるかチェック（他人のkeyを防ぐ）
    // - S3 CopyObjectで latest.webp に反映
    // - or DBに latestKey を保存
    // などを実装する

    return json(200, { ok: true, key });
  }

  // =========================
  // GET
  // =========================
  if (method === "GET" && path === "/me/profile-image") {
    const key = `profiles/${sub}/latest.webp`;
    const url = `${ORIGIN}/${key}`;

    return json(200, { ok: true, key, url });
  }

  return json(404, { ok: false, message: "Not Found" });
};
