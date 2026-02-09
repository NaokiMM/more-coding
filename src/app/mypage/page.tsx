/*
 MyPage（/mypage）
 --------------------
 マイページのトップ画面。

 【役割】
 - 認証状態を確認し、未認証の場合は /login へリダイレクトする
 - 表示用コンポーネント（ProfileSection / Banner / Table）を組み立てる
 - ログアウト確認モーダルの表示制御を行う
 - 学習進捗はカスタムフック（useProgressItems）で取得し、表示コンポーネントへ渡す

 【構成】
 - Header（右上ナビ・ログアウト導線）
 - ProfileSection（ユーザー情報表示）
 - FreeMemberUpgradeBanner（無料会員のみ）
 - LearningProgressTable（進捗表示：loading/error/empty を含む）
 - ResumeLearningSection（学習再開：UIのみ、後々再開先・日時を表示予定）
 - ホームへ戻る導線

 【設計方針】
 - データ取得ロジックは hooks へ、UI 表示は components へ分離
 - page.tsx は画面全体のフローと配置（composition）に集中する
*/

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import ConfirmModal from "@/components/ConfirmModal";
import ProfileSection from "./components/ProfileSection";
import FreeMemberUpgradeBanner from "./components/FreeMemberUpgradeBanner";
import LearningProgressTable from "./components/LearningProgressTable";
import ResumeLearningSection from "./components/ResumeLearningSection";
import { useProgressItems } from "./hooks/useProgressItems";

export default function MyPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, signOut } = useAuth();
  const { items: progressItems, loading: progressLoading, error: progressError } = useProgressItems(
    "basic-01",
    !!isAuthenticated,
    loading
  );
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutConfirm = () => {
    signOut();
    router.push("/login");
  };

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-slate-600 dark:text-slate-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  const subscriptionType = user.subscriptionType || "free";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header
        rightContent={
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/mypage"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              マイページ
            </Link>
            <button
              onClick={handleLogoutClick}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              ログアウト
            </button>
          </nav>
        }
      />

      <ConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title="ログアウトしますか？"
        confirmLabel="ログアウト"
        cancelLabel="キャンセル"
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProfileSection user={user} onLogoutClick={handleLogoutClick} />

        {subscriptionType === "free" && <FreeMemberUpgradeBanner />}

        <LearningProgressTable
          items={progressItems}
          loading={progressLoading}
          error={progressError}
        />

        <ResumeLearningSection />

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              ホームに戻る
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
