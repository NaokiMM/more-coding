/**
 * AI面接 Professional カテゴリ 学習ページ（サーバーコンポーネント）
 *
 * ルート: /learn/ai-interview/professional/[categoryId]/study
 */

import StudyClient from "@/app/learn/ai-interview/associate/[categoryId]/study/StudyClient";
import StudyStartWithLocaleSelect from "@/components/StudyStartWithLocaleSelect";
import { categoriesData as aiInterviewProfessionalCategoriesData } from "@/lib/categories/ai-interview/professional-categories";
import { getQuestionsJsonUrl, isValidLearnLocale, type LearnLocale } from "@/lib/learnLocale";

type PageProps = {
  params: { categoryId: string } | Promise<{ categoryId: string }>;
  searchParams: { locale?: string } | Promise<{ locale?: string }>;
};

export default async function StudyPage({ params, searchParams }: PageProps) {
  const { categoryId } = await Promise.resolve(params);
  const resolvedSearch = await Promise.resolve(searchParams);
  const locale = resolvedSearch?.locale;

  const category = aiInterviewProfessionalCategoriesData.find((c) => c.id === categoryId);
  const studyPath = `/learn/ai-interview/professional/${categoryId}/study`;
  const backHref = "/learn/ai-interview/professional";

  if (!locale || !isValidLearnLocale(locale)) {
    return (
      <StudyStartWithLocaleSelect
        studyPath={studyPath}
        categoryName={category?.name ?? "学習"}
        backHref={backHref}
        backLabel="カテゴリ一覧に戻る"
        colorClass="from-slate-600 to-blue-600"
        icon="🤖"
      />
    );
  }

  const categoryData = await getCategoryData(categoryId, locale);
  const studyRoute = {
    listPath: "/learn/ai-interview/professional",
    listLabel: "Professional",
    courseType: "professional" as const,
    categories: aiInterviewProfessionalCategoriesData,
  };
  return <StudyClient categoryId={categoryId} categoryData={categoryData} route={studyRoute} />;
}

export function generateStaticParams() {
  return aiInterviewProfessionalCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

async function getCategoryData(categoryId: string, locale: LearnLocale): Promise<CategoryData> {
  const category = aiInterviewProfessionalCategoriesData.find((cat) => cat.id === categoryId);

  if (!category) {
    throw new Error(`Category not found: ${categoryId}`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_QUESTIONS_BASE_URL is not set");
  }

  try {
    const jsonUrl = getQuestionsJsonUrl(baseUrl, locale, "ai-interview", "professional", category.file);
    const response = await fetch(jsonUrl, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch category data: ${response.status} ${response.statusText} (${jsonUrl})`);
    }

    const jsonData: JsonQuestion[] = await response.json();

    const questions: Question[] = jsonData.map((q) => ({
      id: q.id,
      question: q.question,
      category: q.category,
      filename: q.filename,
    }));

    const categoryData: CategoryData = {
      categoryId: categoryId,
      categoryName: category.name,
      course: "professional",
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
