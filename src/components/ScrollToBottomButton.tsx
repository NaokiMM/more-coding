/**
 * ScrollToBottomButton コンポーネント
 *
 * 画面左下に固定表示される「1つ前に戻る」ボタン。
 * トップページ（/）および学習ページ（/study）では表示せず、それ以外のページでのみ表示する。
 * クリックでブラウザの履歴を1つ戻る（router.back()）。
 */
"use client";

import { useRouter, usePathname } from "next/navigation";

export default function ScrollToBottomButton() {
  const router = useRouter();
  const pathname = usePathname();

  // トップページの場合は戻るボタンを表示しない
  if (pathname === "/") {
    return null;
  }

  // 学習中（study ページ）の場合は戻るボタンを表示しない
  if (pathname.includes("/study")) {
    return null;
  }

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      aria-label="1つ前に戻る"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}
