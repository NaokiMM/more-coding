// AI面接 Associate・Professional・Expertのページ

// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function AIInterviewLearnPage() {
  const { user, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const subscriptionType = user?.subscriptionType ?? "free";
  const isPaidMember = subscriptionType === "paid";
  const tKey = (key: string) => t(language, key);

  const levels = [
    {
      id: "associate",
      nameKey: "learn.level.associate" as const,
      descriptionKey: "learn.ai-interview.associate.description" as const,
      color: "from-slate-700 to-blue-600",
      icon: "🌱",
      topics: [
        "AI面接 - 概要・準備方法",
        "AI面接 - 自己紹介・志望動機",
        "AI面接 - 長所・短所・自己PR",
        "AI面接 - 質問への回答テクニック",
        "AI面接 - 表情・姿勢・話し方",
      ],
    },
    {
      id: "professional",
      nameKey: "learn.level.professional" as const,
      descriptionKey: "learn.ai-interview.professional.description" as const,
      color: "from-slate-600 to-blue-600",
      icon: "📚",
      topics: [
        "技術面接の対策",
        "ケーススタディへの対応",
        "チームワーク・リーダーシップ",
        "過去の経験の伝え方",
        "逆質問の準備",
        "ストレス面接への対応",
      ],
    },
    {
      id: "expert",
      nameKey: "learn.level.expert" as const,
      descriptionKey: "learn.ai-interview.expert.description" as const,
      color: "from-slate-700 to-blue-600",
      icon: "🚀",
      topics: [
        "エグゼクティブレベルの面接",
        "複数面接官への対応",
        "難易度の高い質問への回答",
        "交渉・条件提示のテクニック",
        "面接後のフォローアップ",
        "内定獲得の戦略",
      ],
    },
  ];

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header
        rightContent={
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
        }
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-blue-600 text-white text-3xl font-bold shadow-lg">
            🤖
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {tKey("tech.ai-interview.name")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {tKey("tech.ai-interview.description")}
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                        : level.id === "expert"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                    }`}
                  >
                    {tKey(level.nameKey)}
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {tKey(level.nameKey)}
                </h2>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  {tKey(level.descriptionKey)}
                </p>

                {/* Topics (expanded when selected) */}
                {selectedLevel === level.id && (
                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-700">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {tKey("learn.learningContent")}:
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
                      {tKey("learn.freeMember")}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">・</span>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {tKey("learn.paidMember")}
                    </span>
                  </div>
                )}
                {(level.id === "professional" || level.id === "expert") && (
                  <div className="mt-4 flex items-center justify-center">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      {tKey("learn.paidMember")}
                    </span>
                  </div>
                )}

                {/* Action Button */}
                {level.id === "associate" ? (
                  <Link
                    href="/learn/ai-interview/associate"
                    className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tKey("learn.getStarted")}
                  </Link>
                ) : level.id === "professional" ? (
                  <>
                    {authLoading ? (
                      <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-70`} onClick={(e) => e.stopPropagation()}>
                        {tKey("common.loading")}
                      </div>
                    ) : isPaidMember ? (
                      <Link
                        href="/learn/ai-interview/professional"
                        className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tKey("learn.getStarted")}
                      </Link>
                    ) : (
                      <>
                        <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-50 cursor-not-allowed`} onClick={(e) => e.stopPropagation()}>
                          {tKey("learn.getStarted")}
                        </div>
                        <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                          <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">{tKey("learn.paidMemberOnly")}</span>
                          <Link href="/pricing" className="text-xs font-medium text-amber-600 underline hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300" onClick={(e) => e.stopPropagation()}>
                            {tKey("learn.viewPricing")}
                          </Link>
                        </div>
                      </>
                    )}
                  </>
                ) : level.id === "expert" ? (
                  <>
                    {authLoading ? (
                      <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-70`} onClick={(e) => e.stopPropagation()}>
                        {tKey("common.loading")}
                      </div>
                    ) : isPaidMember ? (
                      <Link
                        href="/learn/ai-interview/expert"
                        className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {tKey("learn.getStarted")}
                      </Link>
                    ) : (
                      <>
                        <div className={`mt-6 block w-full rounded-lg bg-gradient-to-r ${level.color} px-4 py-3 text-center text-sm font-semibold text-white shadow-lg opacity-50 cursor-not-allowed`} onClick={(e) => e.stopPropagation()}>
                          {tKey("learn.getStarted")}
                        </div>
                        <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-lg bg-amber-50 px-4 py-2 dark:bg-amber-900/20">
                          <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">{tKey("learn.paidMemberOnly")}</span>
                          <Link href="/pricing" className="text-xs font-medium text-amber-600 underline hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300" onClick={(e) => e.stopPropagation()}>
                            {tKey("learn.viewPricing")}
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
            {tKey("learn.backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
