"use client";

import { useState } from "react";
import Link from "next/link";
import { categoriesData } from "@/lib/typescript-categories";

interface StudyClientProps {
  categoryId: string;
}

export default function StudyClient({ categoryId }: StudyClientProps) {
  const category = categoriesData.find((cat) => cat.id === categoryId);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            カテゴリが見つかりません
          </h1>
        </div>
      </div>
    );
  }

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
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
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
          <Link
            href="/learn/typescript/beginner"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Associate
          </Link>
          <span>/</span>
          <Link
            href={`/learn/typescript/beginner/${categoryId}`}
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">学習</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-3xl shadow-lg`}
            >
              {category.icon}
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {category.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                問題を解いて理解を深めましょう
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          {/* Question Number */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white">
              1
            </span>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              問題 1
            </h2>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              問題文
            </label>
            <div className="min-h-[120px] rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-900">
              <p className="text-slate-500 dark:text-slate-400">
                {/* 問題文は後で追加 */}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mb-8 space-y-4">
            <label className="mb-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
              選択肢
            </label>
            {["A", "B", "C", "D"].map((label, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 rounded-lg border-2 p-4 transition-all cursor-pointer ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-600"
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${
                    selectedAnswer === index
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                  }`}
                >
                  {label}
                </div>
                <div className="flex-1 min-h-[60px] rounded border border-dashed border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-800">
                  <p className="text-slate-500 dark:text-slate-400">
                    {/* 選択肢の内容は後で追加 */}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Answer Button */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              {showAnswer ? "答えを隠す" : "答えを確認する"}
            </button>
          </div>

          {/* Answer and Explanation (後で表示できるように構造を保つ) */}
          {showAnswer && (
            <div className="rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                  正解:
                </span>
                <span className="rounded-full bg-green-200 px-3 py-1 text-sm font-bold text-green-800 dark:bg-green-800 dark:text-green-200">
                  {/* 正解は後で追加 */}
                </span>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-green-800 dark:text-green-300">
                  解説:
                </p>
                <div className="min-h-[80px] rounded border border-dashed border-green-300 bg-white p-4 dark:border-green-700 dark:bg-slate-800">
                  <p className="text-slate-500 dark:text-slate-400">
                    {/* 解説は後で追加 */}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href={`/learn/typescript/beginner/${categoryId}`}
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
            カテゴリに戻る
          </Link>
          <button className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
            次の問題へ
          </button>
        </div>
      </div>
    </div>
  );
}

