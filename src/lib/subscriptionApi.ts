/**
 * 課金・サブスクリプションAPI
 * Lambda POST /me/subscription と連携
 */

import { apiFetch } from "./apiFetch";

export interface StartSubscriptionResult {
  ok: boolean;
  alreadyPaid?: boolean;
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
