/**
 * Vue.js 本番試験 レベル別ページ
 * 
 * ルート: /learn/vue/exam/[level]
 * 
 * このページは、Vue.js本番試験の各レベル（associate, professional, expert）の
 * 模擬試験や過去問題演習を選択するページです。
 */
// src/app/learn/vue/exam/[level]/page.tsx

import VueExamLevelClient from "./Client";

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
  return <VueExamLevelClient level={params.level} />;
}
