/**
 * DevTools Associate カテゴリ リダイレクトページ
 * 
 * ルート: /learn/devtools/associate/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/devtools/associate/console-log-usage → /learn/devtools/associate/console-log-usage/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/devtools/associate-categories";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

// 静的エクスポート用: すべてのcategoryIdを生成
export function generateStaticParams() {
  return categoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  
  // カテゴリが存在するか確認
  const category = categoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    redirect("/learn/devtools/associate");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/devtools/associate/${categoryId}/study`);
}
