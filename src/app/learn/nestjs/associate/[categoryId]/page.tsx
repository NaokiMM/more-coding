/**
 * NestJS Associate カテゴリ リダイレクトページ
 *
 * ルート: /learn/nestjs/associate/[categoryId]
 *
 * カテゴリIDを受け取り、そのカテゴリの学習ページ（/study）にリダイレクトします。
 * 例: /learn/nestjs/associate/basics_setup → /learn/nestjs/associate/basics_setup/study
 */

import { redirect } from "next/navigation";
import { categoriesData } from "@/lib/categories/nestjs/associate-categories";

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
    redirect("/learn/nestjs/associate");
  }

  redirect(`/learn/nestjs/associate/${categoryId}/study`);
}
