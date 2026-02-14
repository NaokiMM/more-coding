/**
 * 学習進捗APIクライアント
 */

import { apiFetch, getAccessTokenFromStorage } from "./apiFetch";

/**
 * アクセストークンを取得
 */
export function getAccessToken(): string {
  const token = getAccessTokenFromStorage();
  if (!token) {
    throw new Error("アクセストークンが取得できませんでした。ログインしてください。");
  }
  return token;
}

/**
 * 進捗回答を送信（既存のまま）
 */
export interface PostProgressAnswerInput {
  setId: string;
  problemId: string;
  isCorrect: boolean;
}

export async function postProgressAnswer(
  input: PostProgressAnswerInput
): Promise<any> {
  return await apiFetch("/progress/answer", {
    method: "POST",
    body: JSON.stringify({
      setId: input.setId,
      problemId: input.problemId,
      isCorrect: input.isCorrect,
    }),
  });
}

/**
 * 前回の学習履歴を取得（最新1件）
 */
export interface ProgressHistoryItem {
  userId: string;
  problemId: string;
  content: string;
  level: string;
  material: string;
  studiedAt: string;
}

/** API は item または items 配列で返す場合がある */
export async function getProgressHistory(): Promise<{
  item?: ProgressHistoryItem | null;
  items?: ProgressHistoryItem[];
}> {
  return await apiFetch("/me/learning-histories", {
    method: "GET",
  });
}

/**
 * 進捗アイテムを取得（setId 指定）
 */
export async function getProgressItems(setId: string): Promise<any> {
  return await apiFetch(
    `/progress/items?setId=${encodeURIComponent(setId)}`,
    { method: "GET" }
  );
}
