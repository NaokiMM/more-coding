/**
 * Google OAuth コールバック
 * GOOGLE_REDIRECT_URI にこのパスを指定すること（例: https://example.com/auth/google/callback）
 */
import { NextRequest, NextResponse } from "next/server";
import {
  getGoogleOAuthConfig,
  GOOGLE_TOKEN_URL,
  GOOGLE_USERINFO_URL,
  GOOGLE_ID_TOKEN_COOKIE,
} from "@/lib/google-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7日

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    console.error("[Google OAuth] callback error:", error);
    return NextResponse.redirect(
      new URL(`/login?error=google_${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=google_no_code", request.url)
    );
  }

  try {
    const { clientId, clientSecret, redirectUri } = getGoogleOAuthConfig();

    const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      console.error("[Google OAuth] token exchange failed:", err);
      return NextResponse.redirect(
        new URL("/login?error=google_token", request.url)
      );
    }

    const tokens = await tokenRes.json();
    const idToken = tokens.id_token;
    const accessToken = tokens.access_token;

    if (!idToken) {
      return NextResponse.redirect(
        new URL("/login?error=google_no_id_token", request.url)
      );
    }

    const userRes = await fetch(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!userRes.ok) {
      console.error("[Google OAuth] userinfo failed");
      return NextResponse.redirect(
        new URL("/login?error=google_userinfo", request.url)
      );
    }
    const _userInfo = await userRes.json();

    const response = NextResponse.redirect(new URL("/mypage", request.url));
    response.cookies.set(GOOGLE_ID_TOKEN_COOKIE, idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    return response;
  } catch (e) {
    console.error("[Google OAuth] callback exception:", e);
    return NextResponse.redirect(
      new URL("/login?error=google_callback", request.url)
    );
  }
}
