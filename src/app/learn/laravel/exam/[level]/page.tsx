/**
 * Laravel 本番試験 レベル別ページ
 * 
 * ルート: /learn/laravel/exam/[level]
 * 
 * このページは、Laravel本番試験の各レベル（associate, professional, expert）の
 * 模擬試験や過去問題演習を選択するページです。
 */

// src/app/learn/laravel/exam/[level]/page.tsx

import LaravelExamLevelClient from "./Client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { level: "associate" },
    { level: "professional" },
    { level: "expert" },
  ];
}

export default async function Page({
  params,
}: {
  params: { level: "associate" | "professional" | "expert" } | Promise<{ level: "associate" | "professional" | "expert" }>;
}) {
  const { level } = await Promise.resolve(params);
  return <LaravelExamLevelClient level={level} />;
}
