/**
 * TypeScript Professional カテゴリ一覧ページ
 * 
 * ルート: /learn/typescript/professional
 * 
 * このページは、TypeScript技術者認定 Professionalレベルの学習カテゴリ一覧を表示します。
 * 各カテゴリ（例：ジェネリクス、ユニオン型とインターセクション型など）をクリックすると、そのカテゴリの学習ページに遷移します。
 */

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { categoriesData } from "@/lib/categories/typescript/professional-categories";
import { useAuth } from "@/contexts/AuthContext";

export default function TypeScriptProfessionalPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const subscriptionType = user?.subscriptionType ?? "free";
  const isPaidMember = subscriptionType === "paid";

  useEffect(() => {
    if (authLoading) return;
    if (!isPaidMember) {
      router.replace("/learn/typescript");
    }
  }, [authLoading, isPaidMember, router]);

  if (authLoading || !isPaidMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">MC</div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">More Coding</span>
              </Link>
            </div>
          </div>
        </header>
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  const categories = categoriesData.map((cat) => ({
    ...cat,
    description: `${cat.name}について学習します。`,
    lessons: 10, // 各JSONファイルには10問ずつ含まれている想定
    estimatedTime: "1-2時間",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
                MC
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                More Coding
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
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                マイページ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link
            href="/"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ホーム
          </Link>
          <span>/</span>
          <Link
            href="/learn/typescript"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            TypeScript技術者認定
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">Professional</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-3xl font-bold shadow-lg">
            📚
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Professional
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            より高度な型システムを学びます。実践的なTypeScript開発スキルをマスターしましょう。
          </p>
          {/* Membership Badges */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              有料会員
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/learn/typescript/professional/${category.id}/study`}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 transition-opacity group-hover:opacity-10`}
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-2xl shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Professional
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{category.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{category.lessons}レッスン</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <span>学習を始める</span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/learn/typescript"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
            TypeScript技術者認定に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
