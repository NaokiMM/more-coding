/**
 * 課金・サブスクリプションAPI
 * Lambda POST /me/subscription（課金開始）・DELETE /me/subscription（解約）と連携
 * チェックアウト作成時は /api/checkout でサーバが必ず DB 確認してから作成
 */

import { apiFetch, getAccessTokenFromStorage } from "./apiFetch";

export interface StartSubscriptionResult {
  ok: boolean;
  alreadyPaid?: boolean;
}

export interface CancelSubscriptionResult {
  ok: boolean;
  alreadyFree?: boolean;
}

/**
 * 課金開始をバックエンドに反映する（POST /me/subscription）
 * 決済完了後のリダイレクト先などで呼び、DynamoDB の isPaid / membershipTier を更新する
 */
export async function startSubscription(): Promise<StartSubscriptionResult> {
  const data = await apiFetch("/me/subscription", {
    method: "POST",
    body: JSON.stringify({}),
  });
  return data as StartSubscriptionResult;
}

/**
 * 解約をバックエンドに反映する（DELETE /me/subscription）
 * isPaid = false, membershipTier = "free", paidAt を削除
 */
export async function cancelSubscription(): Promise<CancelSubscriptionResult> {
  const data = await apiFetch("/me/subscription", {
    method: "DELETE",
  });
  return data as CancelSubscriptionResult;
}

export interface CreateCheckoutResult {
  ok: boolean;
  url?: string;
  message?: string;
}

export class AlreadySubscribedError extends Error {
  constructor(message = "すでに有料会員です") {
    super(message);
    this.name = "AlreadySubscribedError";
  }
}

/**
 * チェックアウト作成（課金重複防止: サーバで DB 確認してから作成）
 * POST /api/checkout を呼ぶ。既に有料の場合は AlreadySubscribedError を throw
 */
export async function createCheckoutSession(): Promise<CreateCheckoutResult> {
  const token = getAccessTokenFromStorage();
  if (!token) {
    throw new Error("認証が必要です。ログインしてください。");
  }

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 409) {
    throw new AlreadySubscribedError(data.message || "すでに有料会員です");
  }
  if (!res.ok) {
    throw new Error(data.message || "チェックアウトの作成に失敗しました");
  }

  return data as CreateCheckoutResult;
}
