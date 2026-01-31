/**
 * Node.js Professional カテゴリ 学習ページ（サーバーコンポーネント）
 *
 * ルート: /learn/nodejs/professional/[categoryId]/study
 *
 * ビルド時・SSR時はリポジトリ内 s3-assets/nodejs/professional/jp/*.json を直接読み、
 * fetch に依存しません。
 */

import fs from "fs";
import path from "path";
import StudyClient from "./StudyClient";
import { categoriesData as nodejsProfessionalCategoriesData } from "@/lib/categories/nodejs/professional-categories";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function StudyPage({ params }: PageProps) {
  const { categoryId } = await params;
  const categoryData = await getCategoryData(categoryId);
  return <StudyClient categoryId={categoryId} categoryData={categoryData} />;
}

export function generateStaticParams() {
  return nodejsProfessionalCategoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

async function getCategoryData(categoryId: string): Promise<CategoryData> {
  const category = nodejsProfessionalCategoriesData.find((cat) => cat.id === categoryId);
  if (!category) {
    throw new Error(`Category not found: ${categoryId}`);
  }

  try {
    const filePath = path.join(
      process.cwd(),
      "s3-assets",
      "nodejs",
      "professional",
      "jp",
      category.file
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    const jsonData: JsonQuestion[] = JSON.parse(raw);
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
      course: "professional",
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
