/**
 * Google セッションのログアウト（Cookie 削除）
 */
import { NextResponse } from "next/server";
import { GOOGLE_ID_TOKEN_COOKIE } from "@/lib/google-auth";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(GOOGLE_ID_TOKEN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return res;
}
