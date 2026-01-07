"use client";

import Link from "next/link";

export default function TypeScriptSpecialtyPage() {
  const categories = [
    {
      id: "conditional-types",
      name: "条件付き型（Conditional Types）",
      description: "条件に応じて型を決定する高度な型操作を学びます。",
      icon: "🔀",
      color: "from-purple-500 to-pink-600",
      lessons: 8,
      estimatedTime: "5時間",
    },
    {
      id: "mapped-types",
      name: "マップ型（Mapped Types）",
      description: "既存の型から新しい型を生成する方法を学びます。",
      icon: "🗺️",
      color: "from-pink-500 to-rose-600",
      lessons: 7,
      estimatedTime: "5時間",
    },
    {
      id: "template-literal-types",
      name: "テンプレートリテラル型",
      description: "文字列リテラル型を組み合わせて新しい型を作る方法を学びます。",
      icon: "📝",
      color: "from-rose-500 to-pink-600",
      lessons: 6,
      estimatedTime: "4時間",
    },
    {
      id: "recursive-types",
      name: "型の再帰と複雑な型操作",
      description: "再帰的な型定義と高度な型操作テクニックを学びます。",
      icon: "🌀",
      color: "from-fuchsia-500 to-purple-600",
      lessons: 8,
      estimatedTime: "6時間",
    },
    {
      id: "design-patterns",
      name: "実践的なデザインパターン",
      description: "TypeScriptを使った実践的なデザインパターンを学びます。",
      icon: "🎨",
      color: "from-violet-500 to-purple-600",
      lessons: 10,
      estimatedTime: "6時間",
    },
    {
      id: "performance",
      name: "パフォーマンス最適化",
      description: "TypeScriptコードのパフォーマンスを最適化する方法を学びます。",
      icon: "⚡",
      color: "from-purple-600 to-indigo-600",
      lessons: 6,
      estimatedTime: "4時間",
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
          <span className="text-slate-900 dark:text-white">Specialty</span>
        </nav>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white text-3xl font-bold shadow-lg">
            🚀
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Specialty コース
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            高度な型操作と実践的なパターンを学び、TypeScriptのエキスパートを目指します。
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/learn/typescript/specialty/${category.id}`}
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
                  <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Specialty
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

                <div className="mt-4 flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400">
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

        <div className="mt-12 text-center">
          <Link
            href="/learn/typescript"
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
            TypeScript技術者認定に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}


