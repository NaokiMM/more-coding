/*
 LearningProgressTable
 --------------------
 マイページに表示する前回の学習履歴。

 【役割】
 - 親コンポーネントから渡された学習履歴（最新1件）を表示する
 - 表示形式: material/level/content/YYYY/MM/DD HH:mm

 【表示仕様】
 - loading: ローディングスピナーを表示
 - error: エラーメッセージを表示
 - item なし: 「まだ学習履歴がありません。」
 - item あり: material/level/content/YYYY/MM/DD HH:mm 形式で表示
*/

"use client";

import type { ProgressHistoryItem } from "@/lib/progressApi";

function formatDate(dateString?: string): string {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  } catch {
    return "-";
  }
}

function formatHistoryLine(item: ProgressHistoryItem): string {
  const datePart = formatDate(item.studiedAt);
  return `${item.material}/${item.level}/${item.content}/${datePart}`;
}

interface LearningProgressTableProps {
  item: ProgressHistoryItem | null;
  loading: boolean;
  error: string | null;
}

export default function LearningProgressTable({
  item,
  loading,
  error,
}: LearningProgressTableProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        前回の学習履歴
      </h2>
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
            <p className="text-slate-600 dark:text-slate-400">読み込み中…</p>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
            <p className="text-center">{error}</p>
          </div>
        ) : !item ? (
          <p className="text-center text-slate-600 dark:text-slate-400">
            まだ学習履歴がありません。
          </p>
        ) : (
          <p className="text-center text-slate-900 dark:text-white font-medium">
            {formatHistoryLine(item)}
          </p>
        )}
      </div>
    </div>
  );
}
