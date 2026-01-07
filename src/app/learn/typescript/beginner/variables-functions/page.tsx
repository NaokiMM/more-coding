"use client";

import Link from "next/link";

export default function TypeScriptVariablesFunctionsPage() {
  const lessons = [
    {
      id: 1,
      title: "変数の型定義",
      description: "let、const、varを使った変数の型定義を学びます。",
      duration: "30分",
    },
    {
      id: 2,
      title: "関数の型定義（基本）",
      description: "関数の引数と戻り値の型を定義する方法を学びます。",
      duration: "35分",
    },
    {
      id: 3,
      title: "アロー関数の型定義",
      description: "アロー関数での型定義の方法を学びます。",
      duration: "30分",
    },
    {
      id: 4,
      title: "オプショナル引数とデフォルト値",
      description: "関数のオプショナル引数とデフォルト値の使い方を学びます。",
      duration: "35分",
    },
    {
      id: 5,
      title: "関数の型定義の実践",
      description: "実際のコードで関数の型定義を使う方法を学びます。",
      duration: "40分",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
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
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                マイページ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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
          <Link
            href="/learn/typescript/beginner"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Associate
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">変数と関数の型定義</span>
        </nav>

        <div className="mb-8">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white text-2xl shadow-lg">
            ⚙️
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            変数と関数の型定義
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            変数や関数に型を定義する方法を学びます。
          </p>
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="group rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-slate-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                      {lesson.id}
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {lesson.title}
                    </h2>
                  </div>
                  <p className="ml-13 text-slate-600 dark:text-slate-400">
                    {lesson.description}
                  </p>
                  <div className="ml-13 mt-2 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
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
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/learn/typescript/beginner/variables-functions/study"
                  className="ml-4 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  学習開始
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/learn/typescript/beginner"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Associateコースに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}


