/*
 LearningProgressTable
 --------------------
 マイページに表示する学習進捗一覧テーブル。

 【役割】
 - 親コンポーネントから渡された学習進捗データを一覧表示する
 - データ取得や状態管理は行わず、表示専用に徹する

 【表示仕様】
 - loading: ローディングスピナーを表示
 - error: エラーメッセージを表示
 - items が空: 「進捗なし」メッセージを表示
 - items が存在: 進捗テーブルを表示

 【補足】
 - 日付表示は formatDate 関数で YYYY/MM/DD HH:mm 形式に整形
 - 不正・未設定の日付は "-" を表示する
*/

"use client";

import type { ProgressItem } from "../types";

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

interface LearningProgressTableProps {
  items: ProgressItem[];
  loading: boolean;
  error: string | null;
}

export default function LearningProgressTable({
  items,
  loading,
  error,
}: LearningProgressTableProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        学習進捗
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
        ) : items.length === 0 ? (
          <p className="text-center text-slate-600 dark:text-slate-400">
            まだ学習進捗がありません。
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    問題ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    ステータス
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    試行回数
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    最終回答日時
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.problemId || index}
                    className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                      {item.problemId}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {item.status}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {item.attempts}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(item.lastAnsweredAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
