/**
 * Google OAuth 開始
 * GET /api/auth/google → Google の認証画面へリダイレクト
 */
import { NextRequest, NextResponse } from "next/server";
import {
  getGoogleOAuthConfig,
  GOOGLE_AUTH_URL,
  GOOGLE_OAUTH_SCOPES,
} from "@/lib/google-auth";

export async function GET(request: NextRequest) {
  try {
    const { clientId, redirectUri } = getGoogleOAuthConfig();
    const state = Buffer.from(JSON.stringify({ t: Date.now() })).toString("base64url");
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: GOOGLE_OAUTH_SCOPES,
      access_type: "offline",
      prompt: "consent",
      state,
    });
    const url = `${GOOGLE_AUTH_URL}?${params.toString()}`;
    return NextResponse.redirect(url);
  } catch (error) {
    console.error("[Google OAuth] init error:", error);
    return NextResponse.redirect(
      new URL("/login?error=google_config", request.url)
    );
  }
}
