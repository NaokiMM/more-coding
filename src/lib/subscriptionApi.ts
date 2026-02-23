/**
 * 課金・サブスクリプションAPI
 * Lambda POST /me/subscription（課金開始）・DELETE /me/subscription（解約）と連携
 */

import { apiFetch } from "./apiFetch";

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
