"use client";

import Link from "next/link";

type Level = "associate" | "professional" | "expert";

export default function ReactExamLevelClient({ level }: { level: Level }) {
  const levelInfo = {
    associate: {
      name: "Associate",
      description:
        "React基礎レベルの本番試験。コンポーネント、JSX、Propsなど基本的な概念を試験形式で確認します。",
      color: "from-cyan-500 to-blue-600",
      icon: "🌱",
    },
    professional: {
      name: "Professional",
      description:
        "より高度なReactの機能を試験形式で確認。実践的なアプリケーション開発スキルを試します。",
      color: "from-blue-500 to-cyan-600",
      icon: "📚",
    },
    expert: {
      name: "Expert",
      description:
        "高度なReactパターンとアーキテクチャを試験形式で確認。大規模アプリケーション開発のスキルを試します。",
      color: "from-purple-500 to-pink-600",
      icon: "🚀",
    },
  } as const;

  const currentLevel = levelInfo[level];

  const categories = [
    {
      id: "mock-exam-1",
      name: "模擬試験 第1回",
      description: "本番試験形式の模擬試験です。時間を計って挑戦しましょう。",
      icon: "📋",
      color: currentLevel.color,
      questions: 50,
      estimatedTime: "90分",
    },
    {
      id: "mock-exam-2",
      name: "模擬試験 第2回",
      description: "本番試験形式の模擬試験です。時間を計って挑戦しましょう。",
      icon: "📋",
      color: currentLevel.color,
      questions: 50,
      estimatedTime: "90分",
    },
    {
      id: "mock-exam-3",
      name: "模擬試験 第3回",
      description: "本番試験形式の模擬試験です。時間を計って挑戦しましょう。",
      icon: "📋",
      color: currentLevel.color,
      questions: 50,
      estimatedTime: "90分",
    },
    {
      id: "past-questions",
      name: "過去問題演習",
      description: "過去に出題された問題をカテゴリ別に学習できます。",
      icon: "📚",
      color: "from-amber-500 to-orange-600",
      questions: 200,
      estimatedTime: "5時間",
    },
    {
      id: "exam-tips",
      name: "試験対策ポイント",
      description: "試験でよく出るポイントを効率的に学習できます。",
      icon: "💡",
      color: "from-yellow-500 to-orange-600",
      questions: 100,
      estimatedTime: "3時間",
    },
    {
      id: "time-management",
      name: "時間配分のコツ",
      description: "試験時間を有効活用するための時間配分を学びます。",
      icon: "⏱️",
      color: "from-orange-500 to-amber-600",
      lessons: 5,
      estimatedTime: "1時間",
    },
    {
      id: "common-patterns",
      name: "よく出る問題パターン",
      description: "頻出する問題パターンを集中的に学習できます。",
      icon: "🎯",
      color: "from-red-500 to-pink-600",
      questions: 150,
      estimatedTime: "4時間",
    },
    {
      id: "passing-tips",
      name: "合格ライン突破のコツ",
      description: "合格点を確実に取るための戦略とテクニックを学びます。",
      icon: "🏆",
      color: "from-orange-600 to-red-700",
      lessons: 8,
      estimatedTime: "2時間",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link
            href="/learn/react"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            React
          </Link>
          <span>/</span>
          <Link
            href="/learn/react/exam"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            本番試験
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">本番試験 {currentLevel.name}</span>
        </nav>

        <div className="mb-12 text-center">
          <div
            className={`mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br ${currentLevel.color} text-white text-3xl font-bold shadow-lg`}
          >
            {currentLevel.icon}
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            本番試験 {currentLevel.name}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {currentLevel.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all dark:bg-slate-800"
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
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      level === "associate"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : level === "professional"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {currentLevel.name}
                  </span>
                </div>

                <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{category.estimatedTime}</span>
                  </div>

                  {"questions" in category && category.questions !== undefined && (
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>{category.questions}問</span>
                    </div>
                  )}

                  {"lessons" in category && category.lessons !== undefined && (
                    <div className="flex items-center gap-1">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span>{category.lessons}レッスン</span>
                    </div>
                  )}
                </div>

                <div
                  className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${category.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-50 cursor-not-allowed`}
                >
                  学習を始める
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 dark:bg-red-900/20">
                  <svg
                    className="h-4 w-4 text-red-600 dark:text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                    現在利用不可能
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Reactに戻る
          </button>
        </div>
      </div>
    </div>
  );
}
