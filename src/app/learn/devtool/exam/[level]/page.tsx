/**
 * DevTool 本番試験 レベル別ページ
 * 
 * ルート: /learn/devtool/exam/[level]
 * 
 * このページは、DevTool本番試験の各レベル（associate, professional, expert）の
 * 模擬試験や過去問題演習を選択するページです。
 */

// src/app/learn/devtool/exam/[level]/page.tsx

import DevToolExamLevelClient from "./Client";

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
  return <DevToolExamLevelClient level={params.level} />;
}
