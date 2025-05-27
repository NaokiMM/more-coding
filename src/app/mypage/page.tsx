// マイページ（トップページ）

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

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

  const [learningProgress] = useState([
    {
      id: "javascript",
      name: "JavaScript",
      progress: 65,
      color: "from-blue-500 to-blue-700",
      icon: "JS",
    },
    {
      id: "typescript",
      name: "TypeScript",
      progress: 65,
      color: "from-blue-500 to-blue-700",
      icon: "TS",
    },
    {
      id: "react",
      name: "React",
      progress: 45,
      color: "from-cyan-500 to-blue-600",
      icon: "⚛️",
    },
    {
      id: "vue",
      name: "Vue.js",
      progress: 30,
      color: "from-green-500 to-emerald-600",
      icon: "Vue",
    },
  ]);


  const handleLogout = () => {
    if (confirm("ログアウトしますか？")) {
      signOut();
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </Link>
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
          </div>
        </div>
      </header>

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
            <Link
              href="/mypage/settings"
              className="mt-4 md:mt-0 rounded-lg border-2 border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              設定を編集
            </Link>
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
          <div className="grid gap-6 md:grid-cols-3">
            {learningProgress.map((tech) => (
              <Link
                key={tech.id}
                href={`/learn/${tech.id}`}
                className="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tech.color} text-white text-lg font-bold shadow-lg`}
                  >
                    {tech.icon}
                  </div>
                  <span className="text-2xl font-bold text-slate-900 dark:text-white">
                    {tech.progress}%
                  </span>
                </div>
                <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
                  {tech.name}
                </h3>
                <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className={`h-full bg-gradient-to-r ${tech.color} transition-all duration-500`}
                    style={{ width: `${tech.progress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  続きを学習する →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                SB
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2024 SkillBoost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

