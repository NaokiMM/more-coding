/**
 * AWS Professional カテゴリ リダイレクトページ
 * 
 * ルート: /learn/aws/pro/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/aws/pro/advanced-architecture → /learn/aws/pro/advanced-architecture/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/aws/pro-categories";

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
    redirect("/learn/aws/pro");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/aws/pro/${categoryId}/study`);
}
