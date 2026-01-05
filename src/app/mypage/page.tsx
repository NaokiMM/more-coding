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

  const [learningProgress] = useState([
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

  const [certifications] = useState([
    {
      name: "基本情報技術者",
      status: "学習中",
      targetDate: "2024年6月",
    },
    {
      name: "応用情報技術者",
      status: "計画中",
      targetDate: "2024年12月",
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
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-2xl font-bold text-white">
                {userDisplayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {userDisplayName}
                </h1>
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

        {/* Certifications Section */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              資格取得目標
            </h2>
            <Link
              href="/certifications"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              すべて見る →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-slate-800"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {cert.name}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      cert.status === "学習中"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                    }`}
                  >
                    {cert.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  目標日: {cert.targetDate}
                </p>
                {cert.status === "学習中" && (
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">
                        進捗
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        40%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                        style={{ width: "40%" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h2 className="mb-4 text-2xl font-bold">クイックアクション</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/learn"
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <h3 className="mb-2 font-semibold">学習を続ける</h3>
              <p className="text-sm opacity-90">
                中断した学習を再開します
              </p>
            </Link>
            <Link
              href="/certifications"
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <h3 className="mb-2 font-semibold">資格を探す</h3>
              <p className="text-sm opacity-90">
                新しい資格を探して目標を設定
              </p>
            </Link>
            <Link
              href="/mypage/settings"
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <h3 className="mb-2 font-semibold">設定</h3>
              <p className="text-sm opacity-90">
                アカウント設定を変更
              </p>
            </Link>
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

