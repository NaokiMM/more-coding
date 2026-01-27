// マイページ（トップページ）

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

export default function MyPage() {
  const router = useRouter();
  const { user, loading, isAuthenticated, signOut } = useAuth();

  // 認証チェック
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  // ローディング中または未認証の場合は何も表示しない
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

  // ユーザー情報をフォーマット
  const userDisplayName = user.name || user.email || "ユーザー";
  const userEmail = user.email || "";
  const joinDate = user["custom:joinDate"] || "不明";
  // 会員種別（デフォルトは無料会員）
  const subscriptionType = user.subscriptionType || "free";
  const membershipLabel = subscriptionType === "premium" ? "有料会員" : "無料会員";
  const membershipColor = subscriptionType === "premium" 
    ? "bg-gradient-to-r from-yellow-500 to-orange-500" 
    : "bg-gradient-to-r from-slate-500 to-slate-600";
  // プロフィール画像（localStorageから取得、またはユーザー属性から）
  const profileImage =
    user.picture ||
    user["custom:picture"] ||
    (typeof window !== "undefined" ? localStorage.getItem("profileImage") : null);



  const handleLogout = () => {
    if (confirm("ログアウトしますか？")) {
      signOut();
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header
        rightContent={
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              ホーム
            </Link>
            <Link
              href="/mypage"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              マイページ
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              ログアウト
            </button>
          </nav>
        }
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
            <div className="flex items-center gap-6">
              <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-2xl font-bold text-white">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={userDisplayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{userDisplayName.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {userDisplayName}
                  </h1>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${membershipColor}`}>
                    {membershipLabel}
                  </span>
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-400">
                  {userEmail}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                  会員登録日: {joinDate}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-row gap-3">
              <Link
                href="/mypage/settings"
                className="rounded-lg border-2 border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
              >
                設定を編集
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-lg border-2 border-red-300 bg-white px-6 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-600 dark:bg-slate-700 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>

        {/* Free Member UI */}
        {subscriptionType === "free" && (
          <div className="mb-8 rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg dark:border-slate-600 dark:from-slate-800 dark:to-slate-900">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-2xl shadow-lg">
                  👤
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    無料会員プラン
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    現在無料プランをご利用中です。有料会員にアップグレードすると、すべてのコースにアクセスできます。
                  </p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                有料会員にアップグレード
              </Link>
            </div>
          </div>
        )}

        {/* Learning Progress Section */}
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            学習進捗
          </h2>
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <p className="text-center text-slate-600 dark:text-slate-400">
              まだ学習進捗がありません。
            </p>
          </div>
        </div>

        {/* Back to Home Section */}
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

