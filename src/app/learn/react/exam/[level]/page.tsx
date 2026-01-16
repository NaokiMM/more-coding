/**
 * React 本番試験 レベル別ページ
 * 
 * ルート: /learn/react/exam/[level]
 * 
 * このページは、React本番試験の各レベル（associate, professional, expert）の
 * 模擬試験や過去問題演習を選択するページです。
 */
// src/app/learn/react/exam/[level]/page.tsx

import ReactExamLevelClient from "./Client";

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
  return <ReactExamLevelClient level={level} />;
}
