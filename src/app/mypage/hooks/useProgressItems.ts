/*
 useProgressItems
 --------------------
 学習進捗データを取得・管理するためのカスタムフック。

 【役割】
 - 指定されたセットID（setId）に紐づく学習進捗を API から取得する
 - 取得結果（items）・ローディング状態（loading）・エラー状態（error）をまとめて提供する

 【実行条件】
 - ユーザーが認証済みであること
 - 認証情報のロードが完了していること
   ※ 未認証／認証ロード中は API を呼び出さない

 【内部処理】
 - useEffect 内で非同期に進捗データを取得
 - 取得中は loading を true に設定
 - エラー発生時は内容に応じて表示用メッセージに変換する

 【設計方針】
 - データ取得ロジックと UI を分離するためのフック
 - 表示側（page / component）は本フックの返り値のみを利用する
*/
"use client";

import { useEffect, useState } from "react";
import { getProgressItems } from "@/lib/progressApi";
import type { ProgressItem } from "../types";

interface UseProgressItemsResult {
  items: ProgressItem[];
  loading: boolean;
  error: string | null;
}

export function useProgressItems(
  setId: string,
  isAuthenticated: boolean,
  authLoading: boolean
): UseProgressItemsResult {
  const [items, setItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const fetchProgress = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProgressItems(setId);
        setItems(response.items || []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        if (message?.includes("認証が切れています")) {
          setError("認証が切れています。再ログインしてください。");
        } else {
          setError(message || "進捗の取得に失敗しました");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [setId, isAuthenticated, authLoading]);

  return { items, loading, error };
}
