/**
 * DevTools Expert カテゴリ リダイレクトページ
 *
 * ルート: /learn/devtools/expert/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/devtools/expert-categories";

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
    redirect("/learn/devtools/expert");
  }

  redirect(`/learn/devtools/expert/${categoryId}/study`);
}
