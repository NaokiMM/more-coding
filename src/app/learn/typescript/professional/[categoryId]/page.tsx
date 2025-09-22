/**
 * TypeScript Professional カテゴリ リダイレクトページ
 * 
 * ルート: /learn/typescript/professional/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/typescript/professional/generics → /learn/typescript/professional/generics/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/typescript/professional-categories";

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
    redirect("/learn/typescript/professional");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/typescript/professional/${categoryId}/study`);
}
