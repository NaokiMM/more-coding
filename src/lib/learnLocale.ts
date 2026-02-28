/**
 * 教材ロケール（学習言語）の定義とS3パス生成
 * S3パス: questions/{locale}/{technology}/{course}/{filename}
 */

export const LEARN_LOCALES = ["jp", "en", "cn"] as const;
export type LearnLocale = (typeof LEARN_LOCALES)[number];

export const LEARN_LOCALE_LABELS: Record<LearnLocale, string> = {
  jp: "日本語",
  en: "English",
  cn: "中文",
};

export function isValidLearnLocale(value: string): value is LearnLocale {
  return LEARN_LOCALES.includes(value as LearnLocale);
}

/**
 * S3の教材JSONのURLを生成する
 * 新パス: questions/{locale}/{technology}/{course}/{filename}
 */
export function getQuestionsJsonUrl(
  baseUrl: string,
  locale: LearnLocale,
  technology: string,
  course: string,
  filename: string
): string {
  const base = baseUrl.replace(/\/$/, "");
  return `${base}/questions/${locale}/${technology}/${course}/${filename}`;
}

/**
 * 学習用リンクにlocaleクエリを付与する（ロケール未選択時はそのまま返す）
 */
export function buildLearnHref(path: string, locale: LearnLocale | null): string {
  if (!locale || !isValidLearnLocale(locale)) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}locale=${locale}`;
}
