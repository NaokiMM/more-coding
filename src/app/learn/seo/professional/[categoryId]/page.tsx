/**
 * SEO Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/seo/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/seo/professional-categories";

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
    redirect("/learn/seo/professional");
  }

  redirect(`/learn/seo/professional/${categoryId}/study`);
}
