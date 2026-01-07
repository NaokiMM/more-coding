import { notFound } from "next/navigation";
import Link from "next/link";
import { categoriesData } from "@/lib/typescript-categories";

interface Question {
  id: string;
  question: string;
  type: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
  tags: string[];
  function: string;
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
  params: Promise<{
    categoryId: string;
  }>;
}

// 静的エクスポート用: すべてのcategoryIdを生成
export function generateStaticParams() {
  return categoriesData.map((category) => ({
    categoryId: category.id,
  }));
}

async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  // categoriesDataからcategoryIdに対応するカテゴリを検索
  const category = categoriesData.find((cat) => cat.id === categoryId);
  
  if (!category) {
    return null;
  }

  // CloudFrontからJSONを取得
  const cloudfrontUrl = `https://d1z9w64vvsvlia.cloudfront.net/questions/typescript/${category.file}`;
  
  try {
    const response = await fetch(cloudfrontUrl, {
      cache: "force-cache", // 静的エクスポート用
    });

    if (!response.ok) {
      return null;
    }

    const data: CategoryData = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch category data:", error);
    return null;
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId } = await params;
  const categoryData = await getCategoryData(categoryId);

  if (!categoryData) {
    notFound();
  }

  const category = categoriesData.find((cat) => cat.id === categoryId)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/mypage"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                マイページ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Link
            href="/"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            ホーム
          </Link>
          <span>/</span>
          <Link
            href="/learn/typescript"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            TypeScript技術者認定
          </Link>
          <span>/</span>
          <Link
            href="/learn/typescript/beginner"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Associate
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">{categoryData.categoryName}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-3xl shadow-lg`}
            >
              {category.icon}
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                {categoryData.categoryName}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {categoryData.metadata.totalQuestions}問
              </p>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {categoryData.questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
            >
              {/* Question Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      問題 {index + 1}
                    </h2>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                        {question.difficulty}
                      </span>
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300">
                  {question.question}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => {
                  const optionLabel = String.fromCharCode(65 + optionIndex); // A, B, C, D
                  return (
                    <div
                      key={optionIndex}
                      className="flex items-start gap-3 rounded-lg border-2 border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-600 dark:hover:bg-blue-900/20"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                        {optionLabel}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                        {option}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Answer and Explanation (後で表示できるように構造を保つ) */}
              <div className="mt-6 hidden" data-question-id={question.id}>
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-green-800 dark:text-green-300">
                      正解:
                    </span>
                    <span className="rounded-full bg-green-200 px-3 py-1 text-sm font-bold text-green-800 dark:bg-green-800 dark:text-green-200">
                      {String.fromCharCode(65 + question.correctAnswer)}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                      解説:
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-green-700 dark:text-green-300">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            href="/learn/typescript/beginner"
            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Associateコースに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

