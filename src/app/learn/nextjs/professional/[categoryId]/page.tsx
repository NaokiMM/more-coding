/**
 * Next.js Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/nextjs/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nextjs/professional-categories";

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
    redirect("/learn/nextjs/professional");
  }

  redirect(`/learn/nextjs/professional/${categoryId}/study`);
}
