/**
 * Node.js Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/nodejs/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nodejs/professional-categories";

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
    redirect("/learn/nodejs/professional");
  }

  redirect(`/learn/nodejs/professional/${categoryId}/study`);
}
