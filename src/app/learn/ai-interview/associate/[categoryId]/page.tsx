/**
 * AI面接 Associate カテゴリ リダイレクトページ
 * 
 * ルート: /learn/ai-interview/associate/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/ai-interview/associate/overview-preparation → /learn/ai-interview/associate/overview-preparation/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/ai-interview/associate-categories";

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
    redirect("/learn/ai-interview");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/ai-interview/associate/${categoryId}/study`);
}
