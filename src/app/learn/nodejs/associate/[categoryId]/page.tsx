/**
 * Node.js Associate カテゴリ リダイレクトページ
 *
 * ルート: /learn/nodejs/associate/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nodejs/associate-categories";

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
    redirect("/learn/nodejs/associate");
  }

  redirect(`/learn/nodejs/associate/${categoryId}/study`);
}
