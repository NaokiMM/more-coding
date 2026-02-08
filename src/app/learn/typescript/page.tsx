/**
 * TypeScript Associate・Professional・Specialty・本番試験のページ
 * 
 * ルート: /learn/typescript
 * 
 * このページは、TypeScript技術者認定試験のレベル（Associate、Professional、Specialty、本番試験）
 * を選択するページです。各レベルの概要、学習内容、予想時間などを表示します。
 */

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function TypeScriptLearnPage() {
  const { user, loading: authLoading } = useAuth();
  const subscriptionType = user?.subscriptionType ?? "free";
  const isPaidMember = subscriptionType === "paid";
  const levels = [
    {
      id: "associate",
      name: "Associate",
      description: "TypeScriptの基礎を学びます。型の基本から始めて、基本的な構文をマスターしましょう。",
      color: "from-green-500 to-emerald-600",
      icon: "🌱",
      topics: [
        "TypeScriptとは",
        "型の基本（string, number, boolean）",
        "変数と関数の型定義",
        "インターフェースと型エイリアス",
        "基本的な型推論",
      ],
      estimatedTime: "10時間",
      lessons: 15,
    },
    {
      id: "professional",
      name: "Professional",
      description: "より高度な型システムを学び、実践的な開発スキルを身につけます。",
      color: "from-blue-500 to-cyan-600",
      icon: "📚",
      topics: [
        "ジェネリクス",
        "ユニオン型とインターセクション型",
        "型ガードと型アサーション",
        "モジュールと名前空間",
        "デコレータ",
        "クラスと継承",
      ],
      estimatedTime: "20時間",
      lessons: 30,
    },
    {
      id: "specialty",
      name: "Specialty",
      description: "高度な型操作と実践的なパターンを学び、TypeScriptのエキスパートを目指します。",
      color: "from-purple-500 to-pink-600",
      icon: "🚀",
      topics: [
        "条件付き型（Conditional Types）",
        "マップ型（Mapped Types）",
        "テンプレートリテラル型",
        "型の再帰と複雑な型操作",
        "実践的なデザインパターン",
        "パフォーマンス最適化",
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
      <Header />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white text-3xl font-bold shadow-lg">
            TS
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            TypeScript
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            型安全性を持つJavaScriptのスーパーセット。<br />初級から上級まで、段階的に学習でき、資格を取得することができます。
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
                      level.id === "associate"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : level.id === "professional"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : level.id === "specialty"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                    }`}
                  >
                    {level.name}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {level.name}
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

                {/* Membership Badges */}
                {level.id === "associate" && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                      無料会員
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">・</span>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      有料会員
                    </span>
                  </div>
                )}
                {(level.id === "professional" || level.id === "specialty") && (
                  <div className="mt-4 flex items-center justify-center">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      有料会員
                    </span>
                  </div>
                )}

                {/* Action Button */}
                {level.id === "associate" ? (
                  <Link
                    href={`/learn/typescript/${level.id}`}
                    className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    学習を始める
                  </Link>
                ) : level.id === "exam" ? (
                  <Link
                    href="/learn/typescript/exam"
                    className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    学習を始める
                  </Link>
                ) : level.id === "professional" ? (
                  <>
                    {authLoading ? (
                      <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-70`} onClick={(e) => e.stopPropagation()}>
                        読み込み中...
                      </div>
                    ) : isPaidMember ? (
                      <Link
                        href="/learn/typescript/professional"
                        className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        学習を始める
                      </Link>
                    ) : (
                      <>
                        <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-50 cursor-not-allowed`} onClick={(e) => e.stopPropagation()}>
                          学習を始める
                        </div>
                        <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                          <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">有料会員限定</span>
                          <Link href="/pricing" className="text-xs font-medium text-amber-600 underline hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300" onClick={(e) => e.stopPropagation()}>
                            料金プランを見る
                          </Link>
                        </div>
                      </>
                    )}
                  </>
                ) : level.id === "specialty" ? (
                  <>
                    {authLoading ? (
                      <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-70`} onClick={(e) => e.stopPropagation()}>
                        読み込み中...
                      </div>
                    ) : isPaidMember ? (
                      <Link
                        href="/learn/typescript/expert"
                        className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        学習を始める
                      </Link>
                    ) : (
                      <>
                        <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-50 cursor-not-allowed`} onClick={(e) => e.stopPropagation()}>
                          学習を始める
                        </div>
                        <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                          <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">有料会員限定</span>
                          <Link href="/pricing" className="text-xs font-medium text-amber-600 underline hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300" onClick={(e) => e.stopPropagation()}>
                            料金プランを見る
                          </Link>
                        </div>
                      </>
                    )}
                  </>
                ) : null}
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

