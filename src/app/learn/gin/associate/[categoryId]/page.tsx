/**
 * Gin Associate カテゴリ リダイレクトページ
 *
 * ルート: /learn/gin/associate/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/gin/associate-categories";

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
    redirect("/learn/gin/associate");
  }

  redirect(`/learn/gin/associate/${categoryId}/study`);
}
