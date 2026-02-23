/**
 * チェックアウト作成 API（課金重複防止・サーバで必ず DB 確認）
 *
 * フロントから「申し込む」で Stripe 等の checkout を作成する直前に呼ぶ。
 * 1. 認証トークンでバックエンド /me を叩き、DB 上の課金状態を取得
 * 2. 既に有料なら 409 を返しチェックアウト作成をしない
 * 3. 無料なら 200 を返す（Stripe セッション作成はここで実装するか、別 Lambda で同様の確認後に作成）
 */
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!API_BASE) {
    return NextResponse.json(
      { message: "Server misconfiguration" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${API_BASE.replace(/\/$/, "")}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        return NextResponse.json(
          { message: "Unauthorized" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { message: "Failed to get user" },
        { status: 502 }
      );
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

    // ここで Stripe Checkout Session を作成し、url を返す想定
    // const session = await stripe.checkout.sessions.create({ ... });
    // return NextResponse.json({ url: session.url });
    return NextResponse.json({
      ok: true,
      message: "Checkout creation: implement Stripe session here",
    });
  } catch (e) {
    console.error("Checkout pre-check failed:", e);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
