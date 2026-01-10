// カテゴリページから学習ページへリダイレクト

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/typescript/associate-categories";

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
    redirect("/learn/typescript/associate");
  }

  // 学習ページにリダイレクト
  redirect(`/learn/typescript/associate/${categoryId}/study`);
}

