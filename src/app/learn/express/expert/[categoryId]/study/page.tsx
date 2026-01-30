/**
 * Express.js Expert カテゴリ 学習ページ（サーバーコンポーネント）
 *
 * ルート: /learn/express/expert/[categoryId]/study
 */

import { notFound } from "next/navigation";
import StudyClient from "./StudyClient";
import { categoriesData as expressExpertCategoriesData } from "@/lib/categories/express/expert-categories";

export default async function StudyPage({
  params,
}: {
  params: { categoryId: string } | Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await Promise.resolve(params);
  const categoryData = await getCategoryData(categoryId);

  if (!categoryData) {
    notFound();
  }

  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

export function generateStaticParams() {
  return expressExpertCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

function parseCorrectAnswer(correctAnswer: string): number {
  const raw = String(correctAnswer || "").trim();
  const match = raw.match(/正解[：:]?\s*([A-Z])/i) || raw.match(/^([A-D])$/i);
  return match ? match[1].toUpperCase().charCodeAt(0) - 65 : 0;
}

async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  const category = expressExpertCategoriesData.find((cat) => cat.id === categoryId);

  if (!category) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_QUESTIONS_BASE_URL;
  if (!baseUrl) {
    return null;
  }

  try {
    const jsonUrl = `${baseUrl}/questions/express/expert/${category.file}`;
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
      course: "expert",
      technology: "express",
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
