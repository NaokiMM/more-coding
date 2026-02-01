/**
 * AI面接 Associate カテゴリ 学習ページ（サーバーコンポーネント）
 * 
 * ルート: /learn/ai-interview/associate/[categoryId]/study
 * 
 * このページは、指定されたカテゴリIDの学習データ（問題集）をS3から取得し、
 * StudyClientコンポーネントに渡すサーバーコンポーネントです。
 * 実際の学習UI（問題表示、解答、解説など）はStudyClientコンポーネントで実装されています。
 */

import StudyClient from "./StudyClient";
import { categoriesData as aiInterviewAssociateCategoriesData } from "@/lib/categories/ai-interview/associate-categories";

// URL パラメータから categoryId を取得
export default async function StudyPage({ params }: { params: { categoryId: string } | Promise<{ categoryId: string }> }) {
  const { categoryId } = await Promise.resolve(params);
  const categoryData = await getCategoryData(categoryId);

  // StudyClientコンポーネントにカテゴリIDとカテゴリデータを渡す
  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

// 静的エクスポート用: 生成するページのURL一覧を定義
export function generateStaticParams() {
  return aiInterviewAssociateCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

// categoryId に対応する学習データ(JSON)を S3 から取得する
async function getCategoryData(categoryId: string): Promise<CategoryData> {
  
  // aiInterviewAssociateCategoriesDataからcategoryIdに対応するカテゴリを検索
  const category = aiInterviewAssociateCategoriesData.find((cat) => cat.id === categoryId);
  
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
    const jsonUrl = `${baseUrl}/questions/ai-interview/associate/${category.file}`;
    const response = await fetch(jsonUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category data: ${response.status} ${response.statusText} (${jsonUrl})`);
    }

    const jsonData: JsonQuestion[] = await response.json();
    
    // JSON配列をCategoryData形式に変換（フォーム入力用のシンプルな形式）
    const questions: Question[] = jsonData.map((q) => ({
      id: q.id,
      question: q.question,
      category: q.category,
      filename: q.filename,
    }));
    
    const categoryData: CategoryData = {
      categoryId: categoryId,
      categoryName: category.name,
      course: "associate",
      technology: "ai-interview",
      questions: questions,
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalQuestions: questions.length,
      },
    };
    
    return categoryData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch category data for ${categoryId}: ${error.message}`);
    }
    throw new Error(`Failed to fetch category data for ${categoryId}: Unknown error`);
  }
}

// ---- 型定義（types） ----

// JSON教材の形式（フォーム入力・AI評価用のシンプルな形式）
interface JsonQuestion {
  id: number;
  question: string;
  category: string;
  filename: string;
}

interface Question {
  id: number;
  question: string;
  category: string;
  filename: string;
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
