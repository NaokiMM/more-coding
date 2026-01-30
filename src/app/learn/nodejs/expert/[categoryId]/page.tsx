/**
 * Node.js Expert カテゴリ リダイレクトページ
 *
 * ルート: /learn/nodejs/expert/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nodejs/expert-categories";

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
    redirect("/learn/nodejs/expert");
  }

  redirect(`/learn/nodejs/expert/${categoryId}/study`);
}
