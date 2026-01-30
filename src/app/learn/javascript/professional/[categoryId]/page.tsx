/**
 * JavaScript Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/javascript/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/javascript/professional-categories";

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
    redirect("/learn/javascript/professional");
  }

  redirect(`/learn/javascript/professional/${categoryId}/study`);
}
