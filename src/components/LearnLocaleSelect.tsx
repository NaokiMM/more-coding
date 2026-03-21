"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  LEARN_LOCALES,
  LEARN_LOCALE_LABELS,
  type LearnLocale,
  isValidLearnLocale,
} from "@/lib/learnLocale";

interface LearnLocaleSelectProps {
  /** この教材のトップパス（例: /learn/ai-interview）。選択後に ?locale=jp を付けてリダイレクトする */
  techPath: string;
  /** 教材名（表示用、例: React） */
  techName?: string;
}

/**
 * 教材を始める前のロケール（学習言語）選択画面。
 * JP/EN/CN をプルダウンで選び「学習を始める」で確定。一度選ぶとURLに ?locale= が付き、途中変更はできない。
 */
export default function LearnLocaleSelect({
  techPath,
  techName = "教材",
}: LearnLocaleSelectProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<LearnLocale>("jp");

  const handleStart = () => {
    if (!isValidLearnLocale(selected)) return;
    const url = `${techPath}?locale=${selected}`;
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
          {techName} の教材言語を選択
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">
          学習する言語を選んでください。選択後は途中で変更できません。
        </p>
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <label
            htmlFor="learn-locale"
            className="mb-2 block text-left text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            教材の言語
          </label>
          <select
            id="learn-locale"
            value={selected}
            onChange={(e) => setSelected(e.target.value as LearnLocale)}
            className="mb-6 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            {LEARN_LOCALES.map((loc) => (
              <option key={loc} value={loc}>
                {LEARN_LOCALE_LABELS[loc]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleStart}
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            学習を始める
          </button>
        </div>
      </div>
    </div>
  );
}
