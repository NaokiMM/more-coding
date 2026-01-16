/**
 * Next.js Associate カテゴリ 学習ページ（サーバーコンポーネント）
 * 
 * ルート: /learn/nextjs/associate/[categoryId]/study
 * 
 * このページは、指定されたカテゴリIDの学習データ（問題集）をS3から取得し、
 * StudyClientコンポーネントに渡すサーバーコンポーネントです。
 * 実際の学習UI（問題表示、解答、解説など）はStudyClientコンポーネントで実装されています。
 */

import { notFound } from "next/navigation";
import StudyClient from "./StudyClient";
import { categoriesData as nextjsAssociateCategoriesData } from "@/lib/categories/nextjs/associate-categories";

// 静的生成を強制
export const dynamic = "force-static";

// URL パラメータから categoryId を取得
export default async function StudyPage({ params }: { params: { categoryId: string } | Promise<{ categoryId: string }> }) {
  const { categoryId } = await Promise.resolve(params);
  const categoryData = await getCategoryData(categoryId);

  // データが取得できない場合は404を返す
  if (!categoryData) {
    notFound();
  }

  // StudyClientコンポーネントにカテゴリIDとカテゴリデータを渡す
  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

// 静的エクスポート用: 生成するページのURL一覧を定義
export function generateStaticParams() {
  return nextjsAssociateCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

// categoryId に対応する学習データ(JSON)を S3 から取得する
async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  
  // nextjsAssociateCategoriesDataからcategoryIdに対応するカテゴリを検索
  const category = nextjsAssociateCategoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    return null;
  }

  // 環境変数のチェック
  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    return null;
  }

  // CloudFront経由のS3からJSONをHTTP fetchで取得
  try {
    const jsonUrl = `${baseUrl}/questions/nextjs/associate/${category.file}`;
    const response = await fetch(jsonUrl, {
      // 静的生成のため、force-cache を明示的に指定
      cache: "force-cache",
    });

    if (!response.ok) {
      return null;
    }

    // Content-Typeをチェック
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    const data: CategoryData = await response.json();
    return data;
  } catch (error) {
    // エラーが発生した場合はnullを返す（404ページを表示）
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
