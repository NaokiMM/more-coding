/**
 * AI面接 Associate エントリ
 *
 * ルート: /learn/ai-interview/associate
 *
 * カテゴリ一覧ページは廃止。先頭カテゴリの学習ページへリダイレクトする。
 */

import { redirect } from "next/navigation";
import { getAssociateFirstStudyPath } from "@/lib/categories/ai-interview/associate-categories";

export default function AssociateIndexRedirect() {
  redirect(getAssociateFirstStudyPath());
}
