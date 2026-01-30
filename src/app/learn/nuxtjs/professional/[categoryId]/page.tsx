/**
 * Nuxt.js Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/nuxtjs/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nuxtjs/professional-categories";

interface PageProps {
  params: Promise<{ categoryId: string }>;
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
    redirect("/learn/nuxtjs/professional");
  }

  redirect(`/learn/nuxtjs/professional/${categoryId}/study`);
}
