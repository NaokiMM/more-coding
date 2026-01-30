/**
 * NestJS Expert カテゴリ リダイレクトページ
 *
 * ルート: /learn/nestjs/expert/[categoryId]
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nestjs/expert-categories";

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
    redirect("/learn/nestjs/expert");
  }

  redirect(`/learn/nestjs/expert/${categoryId}/study`);
}
