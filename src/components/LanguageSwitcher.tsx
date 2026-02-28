/**
 * LanguageSwitcher コンポーネント
 *
 * 表示言語（日本語 / 英語 / 中国語）を切り替えるボタン。
 * LanguageContext の language と toggleLanguage を使い、クリックで順に切り替える。
 * 現在の言語に応じてフラグ絵文字と JP/EN/CN ラベルを表示する。
 */
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const META = {
  ja: { flag: "🇯🇵", label: "JP", aria: "Switch language" },
  en: { flag: "🇺🇸", label: "EN", aria: "Switch language" },
  cn: { flag: "🇨🇳", label: "CN", aria: "切换语言" },
} as const;

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const m = META[language];

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      aria-label={m.aria}
      title={m.aria}
    >
      <span className="text-base font-semibold">{m.flag}</span>
      <span>{m.label}</span>
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </button>
  );
}