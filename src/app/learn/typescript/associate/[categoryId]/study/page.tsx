/**
 * TypeScript Associate カテゴリ 学習ページ（サーバーコンポーネント）
 * 
 * ルート: /learn/typescript/associate/[categoryId]/study
 * 
 * このページは、指定されたカテゴリIDの学習データ（問題集）をS3から取得し、
 * StudyClientコンポーネントに渡すサーバーコンポーネントです。
 * 実際の学習UI（問題表示、解答、解説など）はStudyClientコンポーネントで実装されています。
 */

import StudyClient from "./StudyClient";
import { categoriesData as tsAssociateCategoriesData } from "@/lib/categories/typescript/associate-categories";

// URL パラメータから categoryId を取得
export default async function StudyPage({ params }: PageProps) {

  const categoryId = (await params).categoryId;
  const categoryData = await getCategoryData(categoryId);

  console.log(
    "StudyPage: before return, categoryData =",
    !!categoryData,
    "(StudyPage 戻り値直前：カテゴリデータ取得結果)"
  );
  
  // カテゴリデータが取得できなかった場合
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

  // StudyClientコンポーネントにカテゴリIDとカテゴリデータを渡す
  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

// 静的エクスポート用: 生成するページのURL一覧を定義
export function generateStaticParams() {
  return tsAssociateCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

// categoryId に対応する学習データ(JSON)を S3 から取得する
async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  
  // tsAssociateCategoriesDataからcategoryIdに対応するカテゴリを検索
  const category = tsAssociateCategoriesData.find((cat) => cat.id === categoryId);
  
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
    console.error("Failed to fetch category data (カテゴリデータの取得に失敗しました):", error);
    return null;
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

interface PageProps {
  params: Promise<{ // 非同期でデータを取得
    categoryId: string;
  }>;
}