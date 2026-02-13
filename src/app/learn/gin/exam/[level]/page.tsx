/**
 * Gin 本番試験 レベル別ページ
 *
 * ルート: /learn/gin/exam/[level]
 */

import GinExamLevelClient from "./Client";

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
  return <GinExamLevelClient level={level} />;
}
