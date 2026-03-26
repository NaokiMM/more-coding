/**
 * 認証セッションのログアウト（互換エンドポイント）
 */
import { NextResponse } from "next/server";

export async function POST() {
  // Googleログイン機能は削除済み。Cognitoログアウト時の互換エンドポイントとしてOKを返す。
  return NextResponse.json({ ok: true });
}
