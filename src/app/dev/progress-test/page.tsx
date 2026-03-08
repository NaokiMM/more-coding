"use client";

import { useState } from "react";
import { postProgressAnswer, getProgressItems } from "@/lib/progressApi";

export default function ProgressTestPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePostTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await postProgressAnswer({
        setId: "basic-01",
        problemId: "set#basic-01#q#0001",
        isCorrect: true,
      });
      setResult(response);
    } catch (err: any) {
      const errorMessage = err.status
        ? `Status: ${err.status}, Response: ${err.responseText || err.message}`
        : err.message || "エラーが発生しました";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGetTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await getProgressItems("basic-01");
      setResult(response);
    } catch (err: any) {
      const errorMessage = err.status
        ? `Status: ${err.status}, Response: ${err.responseText || err.message}`
        : err.message || "エラーが発生しました";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
          学習進捗APIテスト
        </h1>

        <div className="mb-6 flex gap-4">
          <button
            onClick={handlePostTest}
            disabled={loading}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "実行中..." : "POSTテスト"}
          </button>
          <button
            onClick={handleGetTest}
            disabled={loading}
            className="rounded-lg bg-gradient-to-r from-green-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? "実行中..." : "GETテスト"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <h2 className="mb-2 font-semibold">エラー</h2>
            <pre className="whitespace-pre-wrap text-sm">{error}</pre>
          </div>
        )}

        {result && (
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-slate-800">
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
              レスポンス
            </h2>
            <pre className="overflow-auto rounded-lg bg-slate-100 p-4 text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
