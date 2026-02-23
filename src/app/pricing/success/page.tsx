// 決済完了後のリダイレクト用ページ
// 課金開始 API を呼び、ユーザー情報を更新してからマイページへ遷移する
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { startSubscription } from "@/lib/subscriptionApi";
import Header from "@/components/Header";

export default function PricingSuccessPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, refreshUser } = useAuth();
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.replace("/login?redirect=/pricing/success");
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await startSubscription();
        if (cancelled) return;
        await refreshUser();
        if (cancelled) return;
        setStatus("ok");
        router.replace("/mypage");
      } catch (e) {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(e instanceof Error ? e.message : "課金の反映に失敗しました");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthenticated, router, refreshUser]);

  if (authLoading || status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
            <p className="text-slate-600 dark:text-slate-400">課金を反映しています...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="max-w-md rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800 text-center">
            <p className="text-red-600 dark:text-red-400 font-medium mb-4">{errorMessage}</p>
            <button
              type="button"
              onClick={() => router.push("/mypage")}
              className="rounded-lg bg-slate-200 dark:bg-slate-600 px-4 py-2 text-slate-900 dark:text-white"
            >
              マイページへ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
