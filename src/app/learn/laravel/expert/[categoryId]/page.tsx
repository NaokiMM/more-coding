/**
 * Laravel Expert カテゴリ リダイレクトページ
 * 
 * ルート: /learn/laravel/expert/[categoryId]
 * 
 * このページは、カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/laravel/expert-categories";

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
    redirect("/learn/laravel/expert");
  }

  redirect(`/learn/laravel/expert/${categoryId}/study`);
}
