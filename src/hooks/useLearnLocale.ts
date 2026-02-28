"use client";

import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  type LearnLocale,
  isValidLearnLocale,
  buildLearnHref,
} from "@/lib/learnLocale";

/**
 * 教材ロケールをURLのクエリ（?locale=jp）から取得し、学習用リンクを生成するフック。
 * ロケールは教材開始前に一度選択し、途中変更はできない想定。
 */
export function useLearnLocale(): {
  locale: LearnLocale | null;
  learnHref: (path: string) => string;
  hasValidLocale: boolean;
} {
  const searchParams = useSearchParams();
  const localeParam = searchParams.get("locale");
  const locale: LearnLocale | null =
    localeParam && isValidLearnLocale(localeParam) ? localeParam : null;

  const learnHref = useCallback(
    (path: string) => buildLearnHref(path, locale),
    [locale]
  );

  return {
    locale,
    learnHref,
    hasValidLocale: locale !== null,
  };
}
