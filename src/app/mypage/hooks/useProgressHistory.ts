/*
 useProgressHistory
 --------------------
 前回の学習履歴を取得・管理するためのカスタムフック。

 【役割】
 - GET me/learning-histories で最新1件の学習履歴を取得する
 - 取得結果（item）・ローディング状態（loading）・エラー状態（error）をまとめて提供する

 【実行条件】
 - ユーザーが認証済みであること
 - 認証情報のロードが完了していること
   ※ 未認証／認証ロード中は API を呼び出さない

 【設計方針】
 - データ取得ロジックと UI を分離するためのフック
 - 表示側（page / component）は本フックの返り値のみを利用する
*/
"use client";

import { useEffect, useState } from "react";
import { getProgressHistory, type ProgressHistoryItem } from "@/lib/progressApi";

interface UseProgressHistoryResult {
  item: ProgressHistoryItem | null;
  loading: boolean;
  error: string | null;
}

export function useProgressHistory(
  isAuthenticated: boolean,
  authLoading: boolean
): UseProgressHistoryResult {
  const [item, setItem] = useState<ProgressHistoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProgressHistory();
        // API は items 配列で返す場合があるので両方対応
        const data = response.items?.[0] ?? response.item ?? null;
        setItem(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (message?.includes("認証が切れています")) {
          setError("認証が切れています。再ログインしてください。");
        } else {
          setError(message || "履歴の取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isAuthenticated, authLoading]);

  return { item, loading, error };
}
