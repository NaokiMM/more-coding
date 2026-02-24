/**
 * チェックアウト作成 API（課金重複防止・サーバで必ず DB 確認）
 *
 * フロントから「申し込む」で Stripe 等の checkout を作成する直前に呼ぶ。
 * 1. 認証トークンでバックエンド /me を叩き、DB 上の課金状態を取得
 * 2. 既に有料なら 409 を返しチェックアウト作成をしない
 * 3. 無料なら 200 を返す（Stripe セッション作成はここで実装するか、別 Lambda で同様の確認後に作成）
 */
/**
 * チェックアウト作成 API（課金重複防止・サーバで必ず DB 確認）
 */
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

// 必須ENV
const PRICE_ID = process.env.STRIPE_PRICE_ID!;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!API_BASE) {
    return NextResponse.json({ message: "Server misconfiguration: API_BASE" }, { status: 500 });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ message: "Server misconfiguration: STRIPE_SECRET_KEY" }, { status: 500 });
  }
  if (!PRICE_ID) {
    return NextResponse.json({ message: "Server misconfiguration: STRIPE_PRICE_ID" }, { status: 500 });
  }
  if (!APP_URL) {
    return NextResponse.json({ message: "Server misconfiguration: NEXT_PUBLIC_APP_URL" }, { status: 500 });
  }

  try {
    // 1) DB状態確認
    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.json({ message: "Failed to get user" }, { status: 502 });
    }

    const data = await res.json();
    const item = data?.item ?? {};
    const isPaid = item.isPaid === true;
    const tier = item.membershipTier ?? item.subscriptionType ?? "free";

    if (isPaid || tier === "paid") {
      return NextResponse.json(
        { message: "Already subscribed", code: "ALREADY_SUBSCRIBED" },
        { status: 409 }
      );
    }

    // 2) Stripe Checkout Session作成（サブスク）
    // 任意: 顧客メール / ユーザーID を metadata に入れておくとWebhookで紐付けしやすい
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${APP_URL.replace(/\/$/, "")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL.replace(/\/$/, "")}/cancel`,
      // 任意（おすすめ）：Checkoutでメール入力させるなら省略でもOK
      // customer_email: item.email,
      metadata: {
        // backendのユーザーID等が取れるなら入れる
        userId: String(item.id ?? ""),
      },
    });

    if (!session.url) {
      return NextResponse.json({ message: "Stripe session url missing" }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Checkout pre-check failed:", e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}