/**
 * TypeScript Associate 「型の基本」カテゴリ 学習ページ（静的ルート用）
 * 
 * ルート: /learn/typescript/associate/basic-types/study
 * 
 * このページは、「型の基本（basic-types）」カテゴリの学習データを取得し、
 * StudyClientコンポーネントに渡すサーバーコンポーネントです。
 * 注: このファイルは静的ルート（/basic-types/study）用で、
 * 動的ルート（/[categoryId]/study）の代替として存在している可能性があります。
 */

import { categoriesData } from "@/lib/categories/typescript/associate-categories";
import StudyClient from "../../[categoryId]/study/StudyClient";

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

async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  // categoriesDataからcategoryIdに対応するカテゴリを検索
  const category = categoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    return null;
  }

  // CloudFrontからJSONを取得
  const cloudfrontUrl = `https://d1z9w64vvsvlia.cloudfront.net/questions/typescript/${category.file}`;
  
  try {
    const response = await fetch(cloudfrontUrl, {
      cache: "force-cache", // 静的エクスポート用
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

export default async function BasicTypesStudyPage() {
  const categoryId = "basic-types";
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

