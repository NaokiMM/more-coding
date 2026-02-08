/**
 * Nuxt.js Professional カテゴリ一覧ページ
 *
 * ルート: /learn/nuxtjs/professional
 */

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { categoriesData } from "@/lib/categories/nuxtjs/professional-categories";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function NuxtJSProfessionalPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const subscriptionType = user?.subscriptionType ?? "free";
  const isPaidMember = subscriptionType === "paid";

  useEffect(() => {
    if (authLoading) return;
    if (!isPaidMember) {
      router.replace("/learn/nuxtjs");
    }
  }, [authLoading, isPaidMember, router]);

  if (authLoading || !isPaidMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-slate-500 dark:text-slate-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  const categories = categoriesData.map((cat) => ({
    ...cat,
    description: `${cat.name}について学習します。`,
    lessons: 25,
    estimatedTime: "2-3時間",
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
          <Link href="/learn/nuxtjs" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Nuxt.js
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">Professional</span>
        </nav>

        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-3xl font-bold shadow-lg">
            📚
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Professional
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            より高度なNuxt.jsの機能を学び、実践的なアプリケーション開発スキルを身につけます。
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              有料会員
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/learn/nuxtjs/professional/${category.id}/study`}
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
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Professional
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
            href="/learn/nuxtjs"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Nuxt.jsに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
