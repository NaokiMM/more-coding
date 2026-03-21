// サーバー側で生成されたHTMLに対してクライアント（CSR）で動作するJavaScriptを付与するための宣言
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { categoriesData } from "@/lib/categories/ai-interview/associate-categories";
import { useLearnLocale } from "@/hooks/useLearnLocale";
import { LEARN_LOCALES, LEARN_LOCALE_LABELS, type LearnLocale, isValidLearnLocale } from "@/lib/learnLocale";
import EndStudyButton from "@/components/EndStudyButton";
import { useAuth } from "@/contexts/AuthContext";

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

interface StudyClientProps {
  categoryId: string;
  categoryData: CategoryData;
}

export default function StudyClient({ categoryId, categoryData }: StudyClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { learnHref, locale: urlLocale } = useLearnLocale();
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const category = categoriesData.find((cat) => cat.id === categoryId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);

  // ログイン状態とユーザーIDを確認
  useEffect(() => {
    if (authLoading) return; // 認証情報の読み込み中は何もしない

    if (!isAuthenticated || !user) {
      // ログインしていない場合は開始確認ダイアログを表示しない
      setShowStartDialog(false);
      return;
    }

    // ログインしている場合、学習を開始していなければ確認ダイアログを表示
    if (!hasStarted) {
      setShowStartDialog(true);
    }
  }, [isAuthenticated, user, authLoading, hasStarted]);

  // 学習開始のハンドラー
  const handleStartStudy = () => {
    if (isAuthenticated && user) {
      setHasStarted(true);
      setShowStartDialog(false);
    }
  };

  // ログインページへリダイレクト
  const handleGoToLogin = () => {
    router.push("/login");
  };

  // タイマーの開始（問題が表示された時）
  useEffect(() => {
    // hasStarted が true になり、表示中の問題インデックスが変わったタイミングでのみ初期化
    if (hasStarted) {
      setTimeRemaining(120); // 2分 = 120秒
      setIsTimeUp(false);
      setAnswerText("");
      setEvaluationResult(null);
    }
  }, [currentQuestionIndex, hasStarted]);

  // タイマーのカウントダウン
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) {
      if (timeRemaining === 0) {
        setIsTimeUp(true);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // 時間を分:秒形式に変換
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // 回答を送信
  const handleSubmitAnswer = async () => {
    if (!answerText.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ai-interview/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion.question,
          answer: answerText,
        }),
      });

      if (!response.ok) {
        throw new Error("評価の取得に失敗しました");
      }

      const data = await response.json();
      setEvaluationResult(data.evaluation);
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("回答の評価中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  // データ形式の検証
  if (!categoryData || !categoryData.questions || !Array.isArray(categoryData.questions) || categoryData.questions.length === 0) {
    console.error("データ形式が不正です:", categoryData);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            データ形式が不正です
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            コンソールを確認して原因を追跡してください。
          </p>
        </div>
      </div>
    );
  }

  const total = categoryData.questions.length;
  const currentQuestion = categoryData.questions[currentQuestionIndex];

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            カテゴリが見つかりません
          </h1>
        </div>
      </div>
    );
  }

  // currentQuestion が存在しない場合のチェック
  if (!currentQuestion) {
    console.error("現在の問題が見つかりません:", { currentQuestionIndex, totalQuestions: total, categoryData });
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            問題が見つかりません
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            コンソールを確認して原因を追跡してください。
          </p>
        </div>
      </div>
    );
  }

  // 認証情報の読み込み中
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="text-lg text-slate-600 dark:text-slate-400">読み込み中...</div>
          </div>
        </div>
      </div>
    );
  }

  // ログインしていない場合の表示
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
                  MC
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  More Coding
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-4xl">
                  🔒
                </div>
              </div>
              <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                ログインが必要です
              </h1>
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
                問題学習を開始するには、ログインが必要です。
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGoToLogin}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  ログインする
                </button>
                <Link
                  href="/learn/ai-interview"
                  className="rounded-lg border-2 border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  戻る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 学習開始確認ダイアログ
  if (showStartDialog && !hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
                  MC
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  More Coding
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <div className="text-center">
              <div className="mb-6 flex justify-center">
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br ${category?.color || "from-blue-500 to-blue-700"} text-4xl shadow-lg`}
                >
                  {category?.icon || "📚"}
                </div>
              </div>
              <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">
                {category?.name || "学習"}
              </h1>
              <p className="mb-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
                学習を始めますか？
              </p>
              <p className="mb-4 text-slate-600 dark:text-slate-400">
                全{total}問の問題に取り組みます。教材の言語を選択してください（選択後は途中で変更できません）。
              </p>
              <div className="mb-6 flex flex-col items-center gap-2">
                <label htmlFor="study-dialog-locale" className="block w-full max-w-xs text-left text-sm font-medium text-slate-700 dark:text-slate-300">
                  教材の言語
                </label>
                <select
                  id="study-dialog-locale"
                  value={urlLocale ?? "jp"}
                  onChange={(e) => {
                    const next = e.target.value as LearnLocale;
                    if (isValidLearnLocale(next) && pathname) {
                      const separator = pathname.includes("?") ? "&" : "?";
                      router.push(`${pathname}${separator}locale=${next}`);
                    }
                  }}
                  className="w-full max-w-xs rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                >
                  {LEARN_LOCALES.map((loc) => (
                    <option key={loc} value={loc}>
                      {LEARN_LOCALE_LABELS[loc]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleStartStudy}
                  className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  学習を開始する
                </button>
                <Link
                  href={learnHref("/learn/ai-interview")}
                  className="rounded-lg border-2 border-slate-300 bg-white px-8 py-3 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  戻る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
                MC
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                More Coding
              </span>
            </div>
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/mypage"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                >
                  マイページ
                </Link>
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 pt-4 pb-12 sm:px-6 lg:px-8">
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
            href="/learn/ai-interview"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            AI面接
          </Link>
          <span>/</span>
          <Link
            href="/learn/ai-interview"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Associate
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">{category.name}</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white">学習</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-3xl shadow-lg`}
            >
              {category.icon}
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {category.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                問題を解いて理解を深めましょう
              </p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          {/* Question Number */}
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-blue-600 text-lg font-bold text-white">
              {currentQuestionIndex + 1}
            </span>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              問題 {currentQuestionIndex + 1} / {total}
            </h2>
            {/* タイムリミット表示 */}
            {timeRemaining !== null && (
              <div className={`ml-auto flex items-center gap-2 rounded-full px-4 py-2 ${
                timeRemaining <= 30
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : timeRemaining <= 60
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              }`}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-bold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
            <EndStudyButton categoryId={categoryId} technology="ai-interview" courseType="associate" />
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              問題文
            </label>
            <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-900">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {currentQuestion.question}
              </p>
            </div>
          </div>

          {/* Answer Input Form */}
          {!evaluationResult && (
            <>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  回答（最大1000文字）
                </label>
                <textarea
                  value={answerText}
                  onChange={(e) => {
                    if (e.target.value.length <= 1000) {
                      setAnswerText(e.target.value);
                    }
                  }}
                  disabled={isTimeUp || isSubmitting}
                  placeholder="ここに回答を入力してください..."
                  rows={10}
                  className={`w-full rounded-lg border-2 p-4 text-base leading-relaxed transition-all ${
                    isTimeUp
                      ? "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
                      : "border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900"
                  } text-slate-700 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-slate-300 dark:placeholder-slate-500 disabled:cursor-not-allowed`}
                />
                <div className="mt-2 flex justify-between text-sm">
                  <span className={`text-slate-600 dark:text-slate-400 ${
                    answerText.length >= 1000 ? "text-red-600 dark:text-red-400" : ""
                  }`}>
                    {answerText.length} / 1000 文字
                  </span>
                  {isTimeUp && (
                    <span className="font-semibold text-red-600 dark:text-red-400">
                      時間切れです
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mb-6 flex justify-center">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answerText.trim() || isTimeUp || isSubmitting}
                  className="rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      評価中...
                    </span>
                  ) : (
                    "回答する"
                  )}
                </button>
              </div>
            </>
          )}

          {/* Evaluation Result */}
          {evaluationResult && (
            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-900/20">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white text-xl font-bold">
                  {evaluationResult.score}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    評価結果
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    100点満点
                  </p>
                </div>
              </div>

              {/* Evaluation Details */}
              <div className="mb-6 space-y-4">
                {evaluationResult.evaluation && (
                  <>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        内容の適切性
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {evaluationResult.evaluation.appropriateness}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        論理性
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {evaluationResult.evaluation.logic}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        具体性
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {evaluationResult.evaluation.specificity}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                        簡潔性
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {evaluationResult.evaluation.conciseness}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Feedback */}
              {evaluationResult.feedback && (
                <div className="mb-4 rounded-lg border border-blue-200 bg-white p-4 dark:border-blue-800 dark:bg-slate-800">
                  <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    総合フィードバック
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    {evaluationResult.feedback}
                  </p>
                </div>
              )}

              {/* Improvements */}
              {evaluationResult.improvements && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                  <p className="mb-2 text-sm font-semibold text-green-800 dark:text-green-300">
                    改善点・アドバイス
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-green-700 dark:text-green-400">
                    {evaluationResult.improvements}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-48">
          {currentQuestionIndex > 0 && (
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                  setAnswerText("");
                  setEvaluationResult(null);
                  setTimeRemaining(null);
                  setIsTimeUp(false);
                  window.scrollTo({ top: 0, behavior: "auto" });
                }
              }}
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-slate-500 to-slate-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <svg
                className="mr-2 h-5 w-5"
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
              前の問題へ
            </button>
          )}
          <button
            onClick={() => {
              if (currentQuestionIndex < categoryData.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setAnswerText("");
                setEvaluationResult(null);
                setTimeRemaining(null);
                setIsTimeUp(false);
                window.scrollTo({ top: 0, behavior: "auto" });
              }
            }}
            disabled={currentQuestionIndex >= categoryData.questions.length - 1}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-slate-700 to-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {currentQuestionIndex < categoryData.questions.length - 1 ? (
              <>
                次の問題へ
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </>
            ) : (
              "最後の問題"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
