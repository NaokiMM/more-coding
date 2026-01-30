/**
 * Next.js Expert カテゴリ リダイレクトページ
 *
 * ルート: /learn/nextjs/expert/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nextjs/expert-categories";

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
    redirect("/learn/nextjs/expert");
  }

  redirect(`/learn/nextjs/expert/${categoryId}/study`);
}
