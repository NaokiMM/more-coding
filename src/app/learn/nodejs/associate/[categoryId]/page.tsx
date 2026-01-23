/**
 * Node.js Associate カテゴリ リダイレクトページ
 * 
 * ルート: /learn/nodejs/associate/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/nodejs/associate/modules-package-manager → /learn/nodejs/associate/modules-package-manager/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nodejs/associate-categories";

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
    redirect("/learn/nodejs/associate");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/nodejs/associate/${categoryId}/study`);
}
