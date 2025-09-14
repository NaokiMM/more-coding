/**
 * TypeScript 本番試験 レベル別ページ
 * 
 * ルート: /learn/typescript/exam/[level]
 * 
 * このページは、TypeScript本番試験の各レベル（associate, professional, expert）の
 * 模擬試験や過去問題演習を選択するページです。
 */

// src/app/learn/typescript/exam/[level]/page.tsx

import TypeScriptExamLevelClient from "./Client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { level: "associate" },
    { level: "professional" },
    { level: "expert" },
  ];
}

export default function Page({
  params,
}: {
  params: { level: "associate" | "professional" | "expert" };
}) {
  return <TypeScriptExamLevelClient level={params.level} />;
}
