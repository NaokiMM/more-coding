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
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  const method = event?.requestContext?.http?.method;
  const path = event?.rawPath ?? "/";
  const claims = event?.requestContext?.authorizer?.jwt?.claims ?? {};
  const sub = claims?.sub ?? null;

  if (!sub) return json(401, { ok: false, message: "Unauthorized" });

  const bucket = process.env.PROFILE_IMAGES_BUCKET;
  if (!bucket) return json(500, { ok: false, message: "PROFILE_IMAGES_BUCKET is missing" });

  if (method === "POST" && path === "/profile-image/presign") {
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

  return json(404, { ok: false, message: "Not Found" });
};
