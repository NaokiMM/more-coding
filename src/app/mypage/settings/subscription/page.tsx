// 設定・プラン・解約

"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SettingsLayout from "@/components/SettingsLayout";
import { cancelSubscription } from "@/lib/subscriptionApi";

export default function SubscriptionSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [isCancelling, setIsCancelling] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const subscriptionType = user?.subscriptionType ?? "free";
  const isPaid = subscriptionType === "paid";

  const handleCancel = async () => {
    if (!confirmCancel) return;
    setIsCancelling(true);
    setErrorMessage("");

    try {
      await cancelSubscription();
      await refreshUser();
      setConfirmCancel(false);
    } catch (e) {
      setErrorMessage(
        e instanceof Error ? e.message : "解約の反映に失敗しました"
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <SettingsLayout
      breadcrumbTail="プラン・解約"
      title="プラン・解約"
    >
      <div className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
            現在のプラン
          </h2>
          <p className="text-slate-700 dark:text-slate-300">
            {isPaid ? (
              <span className="font-medium text-green-600 dark:text-green-400">
                有料会員
              </span>
            ) : (
              <span className="text-slate-600 dark:text-slate-400">
                無料会員
              </span>
            )}
          </p>
        </section>

        {isPaid && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4">
              解約
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              解約すると無料会員に戻ります。解約後も当月の終了までは有料機能をご利用いただけます。
            </p>
            {errorMessage && (
              <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                {errorMessage}
              </p>
            )}
            {!confirmCancel ? (
              <button
                type="button"
                onClick={() => setConfirmCancel(true)}
                className="rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-600 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                解約する
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  解約してよろしいですか？
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isCancelling}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    {isCancelling ? "処理中..." : "解約する"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmCancel(false)}
                    disabled={isCancelling}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {!isPaid && (
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              有料プランへアップグレードする場合は料金ページからお申し込みください。
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 text-sm font-semibold text-white hover:from-blue-600 hover:to-blue-800"
            >
              料金を見る
            </Link>
          </section>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/mypage/settings"
          className="inline-flex w-fit items-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          設定に戻る
        </Link>
      </div>
    </SettingsLayout>
  );
}
