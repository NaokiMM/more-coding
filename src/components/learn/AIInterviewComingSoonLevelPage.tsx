"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { getAssociateFirstStudyPath } from "@/lib/categories/ai-interview/associate-categories";

type LevelNameKey = "learn.level.professional" | "learn.level.expert";

export default function AIInterviewComingSoonLevelPage({
  levelNameKey,
}: {
  levelNameKey: LevelNameKey;
}) {
  const { language } = useLanguage();
  const tKey = (key: string) => t(language, key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header
        rightContent={
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              {tKey("nav.home")}
            </Link>
            <Link
              href="/mypage"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              {tKey("nav.mypage")}
            </Link>
          </nav>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link
            href="/"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {tKey("nav.home")}
          </Link>
          <span>/</span>
          <Link
            href="/learn/ai-interview"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {tKey("tech.ai-interview.name")}
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">
            {tKey(levelNameKey)}
          </span>
        </nav>

        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {tKey(levelNameKey)}
          </h1>
          <p className="mt-6 text-lg font-semibold text-slate-800 dark:text-slate-200">
            {tKey("learn.ai-interview.comingSoon.title")}
          </p>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            {tKey("learn.ai-interview.comingSoon.description")}
          </p>
          <Link
            href={getAssociateFirstStudyPath()}
            className="mt-10 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-blue-800"
          >
            {tKey("learn.ai-interview.comingSoon.ctaAssociate")}
          </Link>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/learn/ai-interview"
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
            {tKey("learn.ai-interview.comingSoon.backToHub")}
          </Link>
        </div>
      </div>
    </div>
  );
}
