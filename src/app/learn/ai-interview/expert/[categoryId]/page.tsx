/**
 * AI面接 Expert カテゴリ リダイレクトページ
 *
 * ルート: /learn/ai-interview/expert/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/ai-interview/expert-categories";

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
    redirect("/learn/ai-interview/expert");
  }

  redirect(`/learn/ai-interview/expert/${categoryId}/study`);
}
