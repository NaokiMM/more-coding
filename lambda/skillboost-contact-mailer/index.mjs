import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({});

export const handler = async (event) => {
  try {
    const rawBody = event?.body ?? "{}";
    const body = typeof rawBody === "string" ? JSON.parse(rawBody) : rawBody;

    const name = (body.name ?? "").toString();
    const email = (body.email ?? "").toString();
    const message = (body.message ?? "").toString();
    const subjectFromUser = (body.subject ?? "お問い合わせ").toString();

    const FROM_EMAIL = process.env.FROM_EMAIL;
    const TO_EMAIL = process.env.TO_EMAIL;

    if (!FROM_EMAIL || !TO_EMAIL) {
      throw new Error("FROM_EMAIL / TO_EMAIL が設定されていません");
    }

    const subject = `【SkillBoost】${subjectFromUser}`.slice(0, 200);

    const text = [
      "SkillBoost お問い合わせフォームから新しいメッセージが届きました。",
      "",
      "■ お問い合わせ内容",
      `お名前：${name || "（未入力）"}`,
      `メールアドレス：${email || "（未入力）"}`,
      "",
      "■ メッセージ",
      message || "（未入力）",
      "",
      "----",
      `requestId：${event?.requestContext?.requestId ?? "-"}`,
    ].join("\n");

    const cmd = new SendEmailCommand({
      FromEmailAddress: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: email ? [email] : [],
      Content: {
        Simple: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: text, Charset: "UTF-8" },
          },
        },
      },
    });

    await ses.send(cmd);

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 400,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({ ok: false, message: err?.message ?? "error" }),
    };
  }
};
