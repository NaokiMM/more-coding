"use client";

import Link from "next/link";
import { useState } from "react";

export default function JavaScriptLearnPage() {
  const levels = [
    {
      id: "beginner",
      name: "初級",
      description: "JavaScriptの基礎を学びます。変数、関数、オブジェクトなど基本的な概念から始めましょう。",
      color: "from-yellow-500 to-orange-600",
      icon: "🌱",
      topics: [
        "JavaScriptとは",
        "変数とデータ型",
        "関数の基本",
        "オブジェクトと配列",
        "条件分岐とループ",
        "DOM操作の基本",
      ],
      estimatedTime: "15時間",
      lessons: 20,
    },
    {
      id: "intermediate",
      name: "中級",
      description: "より高度なJavaScriptの機能を学び、実践的なアプリケーション開発スキルを身につけます。",
      color: "from-orange-500 to-red-600",
      icon: "📚",
      topics: [
        "ES6+の機能（アロー関数、分割代入）",
        "非同期処理（Promise、async/await）",
        "クラスと継承",
        "モジュールシステム",
        "エラーハンドリング",
        "配列メソッドと高階関数",
      ],
      estimatedTime: "25時間",
      lessons: 35,
    },
    {
      id: "advanced",
      name: "上級",
      description: "高度なJavaScriptパターンと最適化テクニックを学び、エキスパートレベルのスキルを目指します。",
      color: "from-red-500 to-pink-600",
      icon: "🚀",
      topics: [
        "クロージャとスコープ",
        "プロトタイプと継承",
        "デザインパターン",
        "パフォーマンス最適化",
        "メモリ管理",
        "高度な非同期パターン",
      ],
      estimatedTime: "35時間",
      lessons: 50,
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
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-3xl font-bold shadow-lg">
            JS
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            JavaScript 学習コース
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Web開発の基本となるプログラミング言語。動的なウェブサイトとアプリケーションを構築する力を身につけます。
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid gap-8 md:grid-cols-3">
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
                        : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {level.name}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {level.name}コース
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
                <Link
                  href={`/learn/javascript/${level.id}`}
                  className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                  onClick={(e) => e.stopPropagation()}
                >
                  学習を始める
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/"
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
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
