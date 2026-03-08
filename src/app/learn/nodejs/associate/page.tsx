/**
 * Node.js Associate カテゴリ一覧ページ
 *
 * ルート: /learn/nodejs/associate
 */

"use client";

import Link from "next/link";
import { categoriesData } from "@/lib/categories/nodejs/associate-categories";
import Header from "@/components/Header";

export default function NodeJSAssociatePage() {
  const categories = categoriesData.map((cat) => ({
    ...cat,
    description: `${cat.name}について学習します。`,
    lessons: 20,
    estimatedTime: "1-2時間",
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            ホーム
          </Link>
          <span>/</span>
          <Link href="/learn/nodejs" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Node.js
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">Associate</span>
        </nav>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-3xl font-bold shadow-lg">
            🌱
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Associate
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Node.jsの基礎を学びます。モジュール、非同期、HTTPサーバーなど基本的な概念から始めましょう。
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
              無料会員
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-400">・</span>
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              有料会員
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/learn/nodejs/associate/${category.id}/study`}
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
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                    Associate
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  {category.name}
                </h2>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {category.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span>{category.estimatedTime}</span>
                  <span>{category.lessons}問</span>
                </div>
                <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  <span>学習を始める</span>
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/learn/nodejs"
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
            Node.jsに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
