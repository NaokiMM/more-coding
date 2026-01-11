"use client";

import { useState } from "react";
import Link from "next/link";
import { categoriesData } from "@/lib/categories/typescript/associate-categories";

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CategoryData {
  categoryId: string;
  categoryName: string;
  course: string;
  technology: string;
  questions: Question[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalQuestions: number;
  };
}

interface StudyClientProps {
  categoryId: string;
  categoryData: CategoryData;
}

export default function StudyClient({ categoryId, categoryData }: StudyClientProps) {
  const category = categoriesData.find((cat) => cat.id === categoryId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // データ形式の検証
  if (!categoryData || !categoryData.questions || !Array.isArray(categoryData.questions) || categoryData.questions.length === 0) {
    console.error("データ形式が不正です:", categoryData);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            データ形式が不正です
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            コンソールを確認して原因を追跡してください。
          </p>
        </div>
      </div>
    );
  }

  const total = categoryData.questions.length;
  const currentQuestion = categoryData.questions[currentQuestionIndex];

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

  // currentQuestion が存在しない場合のチェック
  if (!currentQuestion) {
    console.error("現在の問題が見つかりません:", { currentQuestionIndex, totalQuestions: total, categoryData });
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            問題が見つかりません
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            コンソールを確認して原因を追跡してください。
          </p>
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
            href="/learn/typescript/associate"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Associate
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">{category.name}</span>
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
              {currentQuestionIndex + 1}
            </span>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              問題 {currentQuestionIndex + 1} / {total}
            </h2>
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              問題文
            </label>
            <div className="min-h-[120px] rounded-lg border-2 border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-900">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="mb-8 space-y-4">
            <label className="mb-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
              選択肢
            </label>
            {currentQuestion.options.map((option, index) => {
              const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
              const isCorrect = index === currentQuestion.correctAnswer;
              const isSelected = selectedAnswer === index;
              const showResult = showAnswer && selectedAnswer !== null;
              
              // 答えを確認した後のスタイル
              let borderColor = "border-slate-200";
              let bgColor = "bg-slate-50";
              let badgeColor = "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
              
              if (showResult) {
                if (isCorrect) {
                  borderColor = "border-green-500";
                  bgColor = "bg-green-50 dark:bg-green-900/20";
                  badgeColor = "bg-green-500 text-white";
                } else if (isSelected && !isCorrect) {
                  borderColor = "border-red-500";
                  bgColor = "bg-red-50 dark:bg-red-900/20";
                  badgeColor = "bg-red-500 text-white";
                }
              } else if (isSelected) {
                borderColor = "border-blue-500";
                bgColor = "bg-blue-50 dark:bg-blue-900/20";
                badgeColor = "bg-blue-500 text-white";
              }
              
              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 rounded-lg border-2 p-4 transition-all ${
                    !showResult ? "cursor-pointer hover:border-slate-300 dark:hover:border-slate-600" : ""
                  } ${borderColor} ${bgColor} dark:border-slate-700 dark:bg-slate-900`}
                  onClick={() => {
                    if (!showResult) {
                      setSelectedAnswer(index);
                    }
                  }}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold ${badgeColor}`}
                  >
                    {optionLabel}
                  </div>
                  <div className="flex-1 rounded border border-slate-300 bg-white p-3 dark:border-slate-600 dark:bg-slate-800">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {option}
                    </p>
                  </div>
                  {showResult && isCorrect && (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <div className="flex items-center text-red-600 dark:text-red-400">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Answer Button */}
          <div className="mb-6 flex justify-center">
            <button
              onClick={() => {
                if (selectedAnswer === null) return;
                setShowAnswer(true);
              }}
              disabled={selectedAnswer === null}
              className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              答えを確認する
            </button>
          </div>

          {/* Answer and Explanation */}
          {showAnswer && selectedAnswer !== null && (
            <div className={`rounded-lg p-6 ${
              selectedAnswer === currentQuestion.correctAnswer
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-red-50 dark:bg-red-900/20"
            }`}>
              {/* Result */}
              <div className="mb-4 flex items-center gap-3">
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white font-bold">
                      ✓
                    </span>
                    <span className="text-lg font-semibold text-green-800 dark:text-green-300">
                      正解です！
                    </span>
                  </>
                ) : (
                  <>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white font-bold">
                      ✗
                    </span>
                    <span className="text-lg font-semibold text-red-800 dark:text-red-300">
                      不正解です
                    </span>
                  </>
                )}
              </div>

              {/* Correct Answer */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  正解:
                </span>
                <span className="rounded-full bg-green-200 px-3 py-1 text-sm font-bold text-green-800 dark:bg-green-800 dark:text-green-200">
                  {String.fromCharCode(65 + currentQuestion.correctAnswer)}
                </span>
              </div>

              {/* Explanation */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  解説:
                </p>
                <div className="rounded border border-slate-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/learn/typescript/associate"
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
          <button
            onClick={() => {
              if (currentQuestionIndex < categoryData.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setShowAnswer(false);
              }
            }}
            disabled={currentQuestionIndex >= categoryData.questions.length - 1}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {currentQuestionIndex < categoryData.questions.length - 1
              ? "次の問題へ"
              : "最後の問題"}
          </button>
        </div>
      </div>
    </div>
  );
}

