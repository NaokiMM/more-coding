/**
 * EndStudyButton コンポーネント
 *
 * 学習終了ボタンと確認ダイアログを表示する。
 * クリックで「学習を終了しますか？」ダイアログを出し、
 * 確認でトップページへ遷移する。Escape またはオーバーレイクリックでダイアログを閉じる。
 */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface EndStudyButtonProps {
  categoryId: string;
  technology: string;
  courseType: "associate" | "professional" | "expert";
}

export default function EndStudyButton({ categoryId, technology, courseType }: EndStudyButtonProps) {
  const router = useRouter();
  const [showEndDialog, setShowEndDialog] = useState(false);

  const handleOpenDialog = () => setShowEndDialog(true);
  const handleCloseDialog = useCallback(() => setShowEndDialog(false), []);
  const handleConfirmEnd = () => {
    setShowEndDialog(false);
    router.push("/");
  };

  useEffect(() => {
    if (!showEndDialog) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseDialog();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [showEndDialog, handleCloseDialog]);

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="ml-auto flex h-14 items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label="学習を終了する"
      >
        <span>終了</span>
        <span className="text-xs">する</span>
      </button>

      {/* 学習終了確認ダイアログ（アプリ内） */}
      {showEndDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="end-study-dialog-title"
          onClick={(e) => e.target === e.currentTarget && handleCloseDialog()}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="end-study-dialog-title" className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
              学習を終了しますか？
            </h2>
            <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
              トップページに戻ります。進捗は保存されています。
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCloseDialog}
                className="flex-1 rounded-lg border-2 border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                キャンセル
              </button>
              <button
                onClick={handleConfirmEnd}
                className="flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90"
              >
                終了する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
