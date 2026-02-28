/**
 * Node.js Expert カテゴリ 学習ページ（サーバーコンポーネント）
 *
 * ルート: /learn/nodejs/expert/[categoryId]/study
 *
 * 指定されたカテゴリIDの学習データ（問題集）をS3から取得し、
 * StudyClientに渡します。s3-assets/nodejs/expert/*.json に対応。
 */

import StudyClient from "./StudyClient";
import StudyStartWithLocaleSelect from "@/components/StudyStartWithLocaleSelect";
import { categoriesData as nodejsExpertCategoriesData } from "@/lib/categories/nodejs/expert-categories";
import { getQuestionsJsonUrl, isValidLearnLocale, type LearnLocale } from "@/lib/learnLocale";

type PageProps = {
  params: { categoryId: string } | Promise<{ categoryId: string }>;
  searchParams: { locale?: string } | Promise<{ locale?: string }>;
};

export default async function StudyPage({ params, searchParams }: PageProps) {
  const { categoryId } = await Promise.resolve(params);
  const resolvedSearch = await Promise.resolve(searchParams);
  const locale = resolvedSearch?.locale;

  const category = nodejsExpertCategoriesData.find((c) => c.id === categoryId);
  const studyPath = `/learn/nodejs/expert/${categoryId}/study`;
  const backHref = "/learn/nodejs/expert";

  if (!locale || !isValidLearnLocale(locale)) {
    return (
      <StudyStartWithLocaleSelect
        studyPath={studyPath}
        categoryName={category?.name ?? "学習"}
        backHref={backHref}
        backLabel="カテゴリ一覧に戻る"
        colorClass="from-green-600 to-green-800"
        icon="🟢"
      />
    );
  }

  const categoryData = await getCategoryData(categoryId, locale);
  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

export function generateStaticParams() {
  return nodejsExpertCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

async function getCategoryData(categoryId: string, locale: LearnLocale): Promise<CategoryData> {
  const category = nodejsExpertCategoriesData.find((cat) => cat.id === categoryId);
  if (!category) {
    throw new Error(`Category not found: ${categoryId}`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_QUESTIONS_BASE_URL is not set");
  }

  try {
    const jsonUrl = getQuestionsJsonUrl(baseUrl, locale, "nodejs", "expert", category.file);
    const response = await fetch(jsonUrl, { next: { revalidate: 60 } });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch category data: ${response.status} ${response.statusText} (${jsonUrl})`
      );
    }

    const jsonData: JsonQuestion[] = await response.json();
    const questions: Question[] = jsonData.map((q) => {
      const answerMatch = q.correctAnswer.match(/正解：([A-Z])/);
      const correctIndex = answerMatch ? answerMatch[1].charCodeAt(0) - 65 : 0;
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

    return {
      categoryId,
      categoryName: category.name,
      course: "expert",
      technology: "nodejs",
      questions,
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalQuestions: questions.length,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch category data for ${categoryId}: ${error.message}`);
    }
    throw new Error(`Failed to fetch category data for ${categoryId}: Unknown error`);
  }
}

interface JsonQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  explanation: string;
  choices: string[];
  category: string;
  filename: string;
}

interface Question {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
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
