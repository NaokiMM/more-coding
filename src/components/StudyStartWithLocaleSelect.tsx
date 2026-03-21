"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LEARN_LOCALES,
  LEARN_LOCALE_LABELS,
  type LearnLocale,
  isValidLearnLocale,
} from "@/lib/learnLocale";

interface StudyStartWithLocaleSelectProps {
  /** 学習開始後に遷移するURL（?locale= は付与しない）。例: /learn/ai-interview/associate/xyz/study */
  studyPath: string;
  categoryName: string;
  /** 戻るリンク（例: /learn/ai-interview） */
  backHref: string;
  backLabel?: string;
  /** カードのグラデーション（tailwind）。例: from-cyan-500 to-blue-600 */
  colorClass?: string;
  icon?: string;
}

/**
 * 教材の study に locale なしでアクセスしたときに表示する「学習を始めますか？」画面。
 * ここで JP/EN/CN を選び「学習を開始する」で ?locale= 付きの study に遷移する。
 */
export default function StudyStartWithLocaleSelect({
  studyPath,
  categoryName,
  backHref,
  backLabel = "戻る",
  colorClass = "from-blue-500 to-blue-700",
  icon = "📚",
}: StudyStartWithLocaleSelectProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<LearnLocale>("jp");

  const handleStart = () => {
    if (!isValidLearnLocale(selected)) return;
    const separator = studyPath.includes("?") ? "&" : "?";
    router.push(`${studyPath}${separator}locale=${selected}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
                MC
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                More Coding
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-4xl shadow-lg`}
              >
                {icon}
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
              {categoryName}
            </h1>
            <p className="mb-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
              学習を始めますか？
            </p>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              教材の言語を選択してから開始してください。選択後は途中で変更できません。
            </p>

            <div className="mb-8 flex flex-col items-center gap-2">
              <label
                htmlFor="study-locale"
                className="block w-full max-w-60 text-left text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                教材の言語
              </label>
              <select
                id="study-locale"
                value={selected}
                onChange={(e) => setSelected(e.target.value as LearnLocale)}
                className="w-full max-w-60 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              >
                {LEARN_LOCALES.map((loc) => (
                  <option key={loc} value={loc}>
                    {LEARN_LOCALE_LABELS[loc]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mx-auto flex w-full max-w-60 flex-col items-stretch gap-4">
              <button
                type="button"
                onClick={handleStart}
                className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-5 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                学習を開始する
              </button>
              <Link
                href={backHref}
                className="inline-flex justify-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-base font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
              >
                {backLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
