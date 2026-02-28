/**
 * LanguageSwitcher コンポーネント
 *
 * 表示言語（日本語 / 英語 / 中国語）をプルダウンで切り替える。
 * LanguageContext の language と setLanguage を使用する。
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";

const META: Record<
  Language,
  { flag: string; label: string; fullName: string; aria: string }
> = {
  ja: { flag: "🇯🇵", label: "JP", fullName: "日本語", aria: "言語を切り替える" },
  en: { flag: "🇺🇸", label: "EN", fullName: "English", aria: "Switch language" },
  cn: { flag: "🇨🇳", label: "CN", fullName: "中文", aria: "切换语言" },
};

const LANGUAGES: Language[] = ["ja", "en", "cn"];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = META[language];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        aria-label={current.aria}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="language-listbox"
        id="language-trigger"
      >
        <span className="text-base font-semibold">{current.flag}</span>
        <span>{current.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <ul
          id="language-listbox"
          role="listbox"
          aria-labelledby="language-trigger"
          className="absolute right-0 top-full z-50 mt-1 min-w-[10rem] rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-800"
        >
          {LANGUAGES.map((lang) => {
            const m = META[lang];
            const isSelected = lang === language;
            return (
              <li key={lang} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(lang)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-blue-50 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="text-base">{m.flag}</span>
                  <span>{m.fullName}</span>
                  {isSelected && (
                    <svg
                      className="ml-auto h-4 w-4 text-blue-600 dark:text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
