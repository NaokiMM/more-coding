/**
 * JavaScript Associate カテゴリ 学習ページ（サーバーコンポーネント）
 * 
 * ルート: /learn/javascript/associate/[categoryId]/study
 * 
 * このページは、指定されたカテゴリIDの学習データ（問題集）をS3から取得し、
 * StudyClientコンポーネントに渡すサーバーコンポーネントです。
 * 実際の学習UI（問題表示、解答、解説など）はStudyClientコンポーネントで実装されています。
 */

import StudyClient from "./StudyClient";
import { categoriesData as jsAssociateCategoriesData } from "@/lib/categories/javascript/associate-categories";

// URL パラメータから categoryId を取得
export default async function StudyPage({ params }: { params: { categoryId: string } | Promise<{ categoryId: string }> }) {
  const { categoryId } = await Promise.resolve(params);
  const categoryData = await getCategoryData(categoryId);

  // StudyClientコンポーネントにカテゴリIDとカテゴリデータを渡す
  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

// 静的エクスポート用: 生成するページのURL一覧を定義
export function generateStaticParams() {
  return jsAssociateCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

// categoryId に対応する学習データ(JSON)を S3 から取得する
async function getCategoryData(categoryId: string): Promise<CategoryData> {
  
  // jsAssociateCategoriesDataからcategoryIdに対応するカテゴリを検索
  const category = jsAssociateCategoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    throw new Error(`Category not found: ${categoryId}`);
  }

  // 環境変数のチェック
  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_QUESTIONS_BASE_URL is not set");
  }

  // CloudFront経由のS3からJSONをHTTP fetchで取得
  try {
    const jsonUrl = `${baseUrl}/questions/javascript/associate/${category.file}`;
    const response = await fetch(jsonUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category data: ${response.status} ${response.statusText} (${jsonUrl})`);
    }

    const data: CategoryData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch category data for ${categoryId}: ${error.message}`);
    }
    throw new Error(`Failed to fetch category data for ${categoryId}: Unknown error`);
  }
}

// ---- 型定義（types） ----

interface Question {
  id: string; // 問題ID
  question: string; // 問題文
  type: string; // 問題の種類（選択肢、記述式、など）
  options: string[]; // 選択肢
  correctAnswer: number; // 正解の番号
  explanation: string; // 解説
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
