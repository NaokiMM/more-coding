import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ENV_NAME = "prd";
const ses = new SESv2Client({});

const jsonResponse = (statusCode, obj) => ({
  statusCode,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type",
    "access-control-allow-methods": "POST,OPTIONS",
  },
  body: JSON.stringify(obj),
});

const safeStr = (v) =>
  (v ?? "")
    .toString()
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const handler = async (event) => {
  // Preflight（必要なら）
  if (event?.requestContext?.http?.method === "OPTIONS") {
    return jsonResponse(200, { ok: true });
  }

  try {
    const FROM_EMAIL = process.env.FROM_EMAIL;
    const TO_EMAIL = process.env.TO_EMAIL;
    if (!FROM_EMAIL || !TO_EMAIL) {
      return jsonResponse(500, { ok: false, message: "FROM_EMAIL / TO_EMAIL が未設定です" });
    }

    // body parse（base64対応）
    const raw = event?.body ?? "{}";
    const bodyStr =
      event?.isBase64Encoded ? Buffer.from(raw, "base64").toString("utf8") : raw;
    const body = typeof bodyStr === "string" ? JSON.parse(bodyStr) : bodyStr;

    // フォーム項目
    const name = safeStr(body?.name);
    const email = safeStr(body?.email);
    const category = safeStr(body?.category); // 追加：お問い合わせ種別
    const subjectFromUser = safeStr(body?.subject);
    const message = safeStr(body?.message);

    // バリデーション（必要に応じて緩めてOK）
    const errors = [];
    if (!name) errors.push("name は必須です");
    if (!email) errors.push("email は必須です");
    if (email && !isEmail(email)) errors.push("email の形式が不正です");
    if (!category) errors.push("category は必須です");
    if (!subjectFromUser) errors.push("subject は必須です");
    if (!message || message.length < 10) errors.push("message は10文字以上で入力してください");

    if (errors.length) {
      return jsonResponse(400, { ok: false, message: errors.join(" / ") });
    }

    // 件名
    const subject = `【More Coding】[${category}] ${subjectFromUser}`.slice(0, 200);

    // 本文
    const requestId =
      event?.requestContext?.requestId ??
      event?.requestContext?.http?.requestId ??
      "-";

    const text = [
      "More Coding お問い合わせフォームから新しいメッセージが届きました。",
      "",
      "■ お問い合わせ内容",
      `お名前：${name}`,
      `メールアドレス：${email}`,
      `お問い合わせ種別：${category}`,
      `件名：${subjectFromUser}`,
      "",
      "■ お問い合わせ内容（本文）",
      message,
      "",
      "----",
      `requestId：${requestId}`,
    ].join("\n");

    const cmd = new SendEmailCommand({
      FromEmailAddress: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: email ? [email] : [],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: { Text: { Data: text, Charset: "UTF-8" } },
        },
      },
    });

    await ses.send(cmd);
    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse(400, { ok: false, message: err?.message ?? "error" });
  }
};
