import { categoriesData } from "@/lib/typescript-categories";
import StudyClient from "./StudyClient";

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

// 静的エクスポート用: すべてのcategoryIdを生成
export function generateStaticParams() {
  return categoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function StudyPage({ params }: PageProps) {
  const { categoryId } = await params;
  return <StudyClient categoryId={categoryId} />;
}
