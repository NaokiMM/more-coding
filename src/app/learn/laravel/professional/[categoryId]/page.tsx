/**
 * Laravel Professional カテゴリ リダイレクトページ
 * 
 * ルート: /learn/laravel/professional/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/laravel/professional-categories";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

export function generateStaticParams() {
  return categoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  
  const category = categoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    redirect("/learn/laravel/professional");
  }

  redirect(`/learn/laravel/professional/${categoryId}/study`);
}
