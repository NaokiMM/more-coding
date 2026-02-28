/**
 * TypeScript Professional カテゴリ 学習ページ（サーバーコンポーネント）
 * 
 * ルート: /learn/typescript/professional/[categoryId]/study
 * 
 * このページは、指定されたカテゴリIDの学習データ（問題集）をS3から取得し、
 * StudyClientコンポーネントに渡すサーバーコンポーネントです。
 * 実際の学習UI（問題表示、解答、解説など）はStudyClientコンポーネントで実装されています。
 */

import { notFound } from "next/navigation";
import StudyClient from "./StudyClient";
import StudyStartWithLocaleSelect from "@/components/StudyStartWithLocaleSelect";
import { categoriesData as tsProfessionalCategoriesData } from "@/lib/categories/typescript/professional-categories";
import { getQuestionsJsonUrl, isValidLearnLocale, type LearnLocale } from "@/lib/learnLocale";

type PageProps = {
  params: { categoryId: string } | Promise<{ categoryId: string }>;
  searchParams: { locale?: string } | Promise<{ locale?: string }>;
};

export default async function StudyPage({ params, searchParams }: PageProps) {
  const { categoryId } = await Promise.resolve(params);
  const resolvedSearch = await Promise.resolve(searchParams);
  const locale = resolvedSearch?.locale;

  const category = tsProfessionalCategoriesData.find((c) => c.id === categoryId);
  const studyPath = `/learn/typescript/professional/${categoryId}/study`;
  const backHref = "/learn/typescript/professional";

  if (!locale || !isValidLearnLocale(locale)) {
    return (
      <StudyStartWithLocaleSelect
        studyPath={studyPath}
        categoryName={category?.name ?? "学習"}
        backHref={backHref}
        backLabel="カテゴリ一覧に戻る"
        colorClass="from-blue-500 to-indigo-600"
        icon="📘"
      />
    );
  }

  const categoryData = await getCategoryData(categoryId, locale);

  if (!categoryData) {
    notFound();
  }

  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

// 静的エクスポート用: 生成するページのURL一覧を定義
export function generateStaticParams() {
  return tsProfessionalCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

// categoryId に対応する学習データ(JSON)を S3 から取得する
async function getCategoryData(categoryId: string, locale: LearnLocale): Promise<CategoryData | null> {
  
  // tsProfessionalCategoriesDataからcategoryIdに対応するカテゴリを検索
  const category = tsProfessionalCategoriesData.find((cat) => cat.id === categoryId);
  
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
    const jsonUrl = getQuestionsJsonUrl(baseUrl, locale, "typescript", "professional", category.file);
    const response = await fetch(jsonUrl, {
      next: { revalidate: 60 },
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
