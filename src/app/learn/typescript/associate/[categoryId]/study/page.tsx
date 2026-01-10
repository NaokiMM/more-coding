import StudyClient from "./StudyClient";
import { categoriesData } from "@/lib/categories/typescript/associate-categories";

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CategoryData {
  categoryId: string;
  categoryName: string;
  course: string;
  technology: string;
  questions: Question[];
  metadata: {
    version: string;
    lastUpdated: string;
    totalQuestions: number;
  };
}

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

async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  // categoriesDataからcategoryIdに対応するカテゴリを検索
  const category = categoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    return null;
  }

  // 環境変数のチェック
  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    console.error("NEXT_PUBLIC_QUESTIONS_BASE_URL is not set");
    return null;
  }

  // CloudFront経由のS3からJSONをHTTP fetchで取得
  try {
    const jsonUrl = `${baseUrl}/questions/typescript/associate/${category.file}`;
    const response = await fetch(jsonUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data: CategoryData = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch category data:", error);
    return null;
  }
}

export default async function StudyPage({ params }: PageProps) {
  const { categoryId } = await params;
  const categoryData = await getCategoryData(categoryId);
  
  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            データの取得に失敗しました
          </h1>
        </div>
      </div>
    );
  }

  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}
