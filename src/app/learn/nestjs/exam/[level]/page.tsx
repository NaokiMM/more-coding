/**
 * NestJS 本番試験 レベル別ページ
 * 
 * ルート: /learn/nestjs/exam/[level]
 * 
 * このページは、NestJS本番試験の各レベル（associate, professional, expert）の
 * 模擬試験や過去問題演習を選択するページです。
 */

// src/app/learn/nestjs/exam/[level]/page.tsx

import NestJSExamLevelClient from "./Client";

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
  return <NestJSExamLevelClient level={level} />;
}
