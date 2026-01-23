/**
 * Laravel Associate カテゴリ リダイレクトページ
 * 
 * ルート: /learn/laravel/associate/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/laravel/associate/routing-controllers → /learn/laravel/associate/routing-controllers/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/laravel/associate-categories";

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
    redirect("/learn/laravel/associate");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/laravel/associate/${categoryId}/study`);
}
