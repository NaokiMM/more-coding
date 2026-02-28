/**
 * 現在の認証セッション取得（Google ログイン用）
 * Cookie の id_token をデコードしてユーザー情報を返す
 */
import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_ID_TOKEN_COOKIE } from "@/lib/google-auth";

interface GoogleIdTokenPayload {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

function decodeJwtPayload(token: string): GoogleIdTokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
    return JSON.parse(decoded) as GoogleIdTokenPayload;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(GOOGLE_ID_TOKEN_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const payload = decodeJwtPayload(token);
  if (!payload?.sub) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      email: payload.email ?? "",
      name: payload.name ?? payload.email ?? "",
      auth: {
        sub: payload.sub,
        name: payload.name ?? null,
        email: payload.email ?? null,
      },
      subscriptionType: "free",
      picture: payload.picture,
    },
  });
}
