/**
 * Nuxt.js Associate カテゴリ リダイレクトページ
 *
 * ルート: /learn/nuxtjs/associate/[categoryId]
 *
 * カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nuxtjs/associate-categories";

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
    redirect("/learn/nuxtjs/associate");
  }

  redirect(`/learn/nuxtjs/associate/${categoryId}/study`);
}
