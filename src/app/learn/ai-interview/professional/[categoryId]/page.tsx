/**
 * AI面接 Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/ai-interview/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/ai-interview/professional-categories";

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
    redirect("/learn/ai-interview/professional");
  }

  redirect(`/learn/ai-interview/professional/${categoryId}/study`);
}
