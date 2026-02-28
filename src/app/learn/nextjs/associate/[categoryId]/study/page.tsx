/**
 * Next.js Associate カテゴリ 学習ページ（サーバーコンポーネント）
 * locale 未指定時は「学習を始めますか？」で言語選択。?locale=jp|en|cn で S3: questions/{locale}/nextjs/associate/{filename}
 */

import { notFound } from "next/navigation";
import StudyClient from "./StudyClient";
import StudyStartWithLocaleSelect from "@/components/StudyStartWithLocaleSelect";
import { categoriesData as nextjsAssociateCategoriesData } from "@/lib/categories/nextjs/associate-categories";
import { getQuestionsJsonUrl, isValidLearnLocale, type LearnLocale } from "@/lib/learnLocale";

type PageProps = {
  params: { categoryId: string } | Promise<{ categoryId: string }>;
  searchParams: { locale?: string } | Promise<{ locale?: string }>;
};

export default async function StudyPage({ params, searchParams }: PageProps) {
  const { categoryId } = await Promise.resolve(params);
  const resolvedSearch = await Promise.resolve(searchParams);
  const locale = resolvedSearch?.locale;

  const category = nextjsAssociateCategoriesData.find((c) => c.id === categoryId);
  const studyPath = `/learn/nextjs/associate/${categoryId}/study`;
  const backHref = "/learn/nextjs/associate";

  if (!locale || !isValidLearnLocale(locale)) {
    return (
      <StudyStartWithLocaleSelect
        studyPath={studyPath}
        categoryName={category?.name ?? "学習"}
        backHref={backHref}
        backLabel="カテゴリ一覧に戻る"
        colorClass="from-gray-700 to-gray-900"
        icon="▲"
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
  return nextjsAssociateCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

// categoryId に対応する学習データ(JSON)を S3 から取得する（パス: questions/{locale}/nextjs/associate/{file}）
async function getCategoryData(categoryId: string, locale: LearnLocale): Promise<CategoryData | null> {
  
  const category = nextjsAssociateCategoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    const jsonUrl = getQuestionsJsonUrl(baseUrl, locale, "nextjs", "associate", category.file);
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

    const jsonData: JsonQuestion[] = await response.json();
    
    // JSON配列をCategoryData形式に変換
    const questions: Question[] = jsonData.map((q) => {
      // correctAnswer文字列（"正解：A"など）をインデックスに変換
      const answerMatch = q.correctAnswer.match(/正解：([A-Z])/);
      const correctIndex = answerMatch 
        ? answerMatch[1].charCodeAt(0) - 65 // A=0, B=1, C=2, D=3
        : 0;
      
      return {
        id: q.id,
        question: q.question,
        choices: q.choices,
        correctAnswer: correctIndex,
        explanation: q.explanation,
        category: q.category,
        filename: q.filename,
      };
    });
    
    const categoryData: CategoryData = {
      categoryId: categoryId,
      categoryName: category.name,
      course: "associate",
      technology: "nextjs",
      questions: questions,
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalQuestions: questions.length,
      },
    };
    
    return categoryData;
  } catch (error) {
    // エラーが発生した場合はnullを返す（404ページを表示）
    return null;
  }
}

// ---- 型定義（types） ----

// JSON教材の形式に合わせた型定義
interface JsonQuestion {
  id: number;
  question: string;
  correctAnswer: string; // "正解：A", "正解：B" などの形式
  explanation: string;
  choices: string[];
  category: string;
  filename: string;
}

interface Question {
  id: number; // 問題ID
  question: string; // 問題文
  choices: string[]; // 選択肢
  correctAnswer: number; // 正解のインデックス（0, 1, 2, 3...）
  explanation: string; // 解説
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
