"use client";

import Link from "next/link";
import { useState } from "react";

export default function VueLearnPage() {
  const levels = [
    {
      id: "beginner",
      name: "初級",
      description: "Vue.jsの基礎を学びます。テンプレート構文から始めて、基本的な概念をマスターしましょう。",
      color: "from-green-500 to-emerald-600",
      icon: "🌱",
      topics: [
        "Vue.jsとは",
        "テンプレート構文",
        "ディレクティブ（v-if, v-for）",
        "データバインディング",
        "コンポーネントの基本",
        "イベントハンドリング",
      ],
      estimatedTime: "10時間",
      lessons: 16,
    },
    {
      id: "intermediate",
      name: "中級",
      description: "より高度なVue.jsの機能を学び、実践的なアプリケーション開発スキルを身につけます。",
      color: "from-blue-500 to-cyan-600",
      icon: "📚",
      topics: [
        "Composition API",
        "リアクティビティの詳細",
        "ライフサイクルフック",
        "コンポーネント間通信",
        "Vue Router",
        "状態管理（Pinia）",
      ],
      estimatedTime: "22時間",
      lessons: 32,
    },
    {
      id: "advanced",
      name: "上級",
      description: "高度なVue.jsパターンとアーキテクチャを学び、大規模アプリケーション開発のエキスパートを目指します。",
      color: "from-purple-500 to-pink-600",
      icon: "🚀",
      topics: [
        "高度なComposition API",
        "カスタムディレクティブ",
        "プラグイン開発",
        "SSR（Nuxt.js）",
        "パフォーマンス最適化",
        "テスト戦略と実践",
      ],
      estimatedTime: "30時間",
      lessons: 45,
    },
    {
      id: "exam",
      name: "本番試験",
      description: "実際の試験形式で実力を試し、合格に向けた最終準備を行います。",
      color: "from-orange-500 to-red-600",
      icon: "📝",
      topics: [
        "模擬試験（全3回）",
        "過去問題演習",
        "試験対策ポイント",
        "時間配分のコツ",
        "よく出る問題パターン",
        "合格ライン突破のコツ",
      ],
      estimatedTime: "15時間",
      lessons: 20,
    },
  ];

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

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
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl font-bold shadow-lg">
            Vue
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Vue.js 学習コース
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            プログレッシブなJavaScriptフレームワーク。段階的に採用できる柔軟性を活かして学びます。
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800 ${
                selectedLevel === level.id ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedLevel(selectedLevel === level.id ? null : level.id)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${level.color} opacity-0 transition-opacity group-hover:opacity-10 ${
                  selectedLevel === level.id ? "opacity-10" : ""
                }`}
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${level.color} text-3xl shadow-lg`}
                  >
                    {level.icon}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      level.id === "beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : level.id === "intermediate"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : level.id === "advanced"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                    }`}
                  >
                    {level.name}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {level.id === "exam" ? level.name : `${level.name}コース`}
                </h2>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  {level.description}
                </p>

                {/* Stats */}
                <div className="mb-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
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
                    <span>{level.estimatedTime}</span>
                  </div>
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <span>{level.lessons}レッスン</span>
                  </div>
                </div>

                {/* Topics (expanded when selected) */}
                {selectedLevel === level.id && (
                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      学習内容:
                    </h3>
                    <ul className="space-y-1">
                      {level.topics.map((topic, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Button */}
                <>
                  <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-50 cursor-not-allowed`}>
                    学習を始める
                  </div>
                  {/* 現在利用不可能 UI */}
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
                </>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
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
      </div>
    </div>
  );
}


