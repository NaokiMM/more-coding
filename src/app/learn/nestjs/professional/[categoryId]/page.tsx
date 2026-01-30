/**
 * NestJS Professional カテゴリ リダイレクトページ
 *
 * ルート: /learn/nestjs/professional/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nestjs/professional-categories";

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
    redirect("/learn/nestjs/professional");
  }

  redirect(`/learn/nestjs/professional/${categoryId}/study`);
}
