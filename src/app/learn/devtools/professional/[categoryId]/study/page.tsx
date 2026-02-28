/**
 * DevTools Professional カテゴリ 学習ページ（サーバーコンポーネント）
 *
 * ルート: /learn/devtools/professional/[categoryId]/study
 */

import { notFound } from "next/navigation";
import StudyClient from "./StudyClient";
import StudyStartWithLocaleSelect from "@/components/StudyStartWithLocaleSelect";
import { categoriesData as devtoolsProfessionalCategoriesData } from "@/lib/categories/devtools/professional-categories";
import { getQuestionsJsonUrl, isValidLearnLocale, type LearnLocale } from "@/lib/learnLocale";

type PageProps = {
  params: { categoryId: string } | Promise<{ categoryId: string }>;
  searchParams: { locale?: string } | Promise<{ locale?: string }>;
};

export default async function StudyPage({ params, searchParams }: PageProps) {
  const { categoryId } = await Promise.resolve(params);
  const resolvedSearch = await Promise.resolve(searchParams);
  const locale = resolvedSearch?.locale;

  const category = devtoolsProfessionalCategoriesData.find((c) => c.id === categoryId);
  const studyPath = `/learn/devtools/professional/${categoryId}/study`;
  const backHref = "/learn/devtools/professional";

  if (!locale || !isValidLearnLocale(locale)) {
    return (
      <StudyStartWithLocaleSelect
        studyPath={studyPath}
        categoryName={category?.name ?? "学習"}
        backHref={backHref}
        backLabel="カテゴリ一覧に戻る"
        colorClass="from-orange-500 to-amber-600"
        icon="🛠"
      />
    );
  }

  const categoryData = await getCategoryData(categoryId, locale);

  if (!categoryData) {
    notFound();
  }

  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

export function generateStaticParams() {
  return devtoolsProfessionalCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

function parseCorrectAnswer(correctAnswer: string): number {
  const raw = String(correctAnswer || "").trim();
  const match = raw.match(/正解[：:]?\s*([A-Z])/i) || raw.match(/^([A-D])$/i);
  return match ? match[1].toUpperCase().charCodeAt(0) - 65 : 0;
}

async function getCategoryData(categoryId: string, locale: LearnLocale): Promise<CategoryData | null> {
  const category = devtoolsProfessionalCategoriesData.find((cat) => cat.id === categoryId);

  if (!category) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    const jsonUrl = getQuestionsJsonUrl(baseUrl, locale, "devtools", "professional", category.file);
    const response = await fetch(jsonUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    const jsonData: JsonQuestion[] = await response.json();

    const questions: Question[] = jsonData.map((q) => ({
      id: q.id,
      question: q.question,
      choices: q.choices,
      correctAnswer: parseCorrectAnswer(q.correctAnswer),
      explanation: q.explanation,
      category: q.category,
      filename: q.filename,
    }));

    return {
      categoryId,
      categoryName: category.name,
      course: "professional",
      technology: "devtools",
      questions,
      metadata: {
        version: "1.0.0",
        lastUpdated: new Date().toISOString(),
        totalQuestions: questions.length,
      },
    };
  } catch {
    return null;
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
