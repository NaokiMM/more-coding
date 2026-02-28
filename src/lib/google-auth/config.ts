/**
 * Google OAuth 設定（サーバー側でのみ使用）
 * .env.local の GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REDIRECT_URI を参照
 */

export function getGoogleOAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  const missing: string[] = [];
  if (!clientId) missing.push("GOOGLE_CLIENT_ID");
  if (!clientSecret) missing.push("GOOGLE_CLIENT_SECRET");
  if (!redirectUri) missing.push("GOOGLE_REDIRECT_URI");

  if (missing.length > 0) {
    throw new Error(
      `Google OAuth 設定が不足しています。.env.local に設定してください: ${missing.join(", ")}`
    );
  }

  return {
    clientId: clientId as string,
    clientSecret: clientSecret as string,
    redirectUri: redirectUri as string,
  };
}

export const GOOGLE_OAUTH_SCOPES = [
  "openid",
  "email",
  "profile",
].join(" ");

export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
export const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";

/** Google ログイン時に id_token を保存する Cookie 名 */
export const GOOGLE_ID_TOKEN_COOKIE = "google_id_token";
