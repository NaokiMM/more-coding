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
