/**
 * Express.js Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/express/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/express/professional-categories";

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
    redirect("/learn/express/professional");
  }

  redirect(`/learn/express/professional/${categoryId}/study`);
}
