/**
 * 学習進捗APIクライアント
 */

import { apiFetch, getAccessTokenFromStorage } from "./apiFetch";

/**
 * アクセストークンを取得
 * トークンが存在しない場合は例外をスロー
 */
export function getAccessToken(): string {
  const token = getAccessTokenFromStorage();
  if (!token) {
    throw new Error("アクセストークンが取得できませんでした。ログインしてください。");
  }
  return token;
}

/**
 * 進捗回答を送信
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
 * 進捗アイテムを取得
 */
export async function getProgressItems(setId: string): Promise<any> {
  return await apiFetch(
    `/progress/items?setId=${encodeURIComponent(setId)}`,
    {
      method: "GET",
    }
  );
}
