/**
 * ConfirmModal コンポーネント
 *
 * 確認ダイアログを表示し、ユーザーの「OK」「キャンセル」選択を受け付ける。
 * - オーバーレイクリックまたは Escape キーで閉じる
 * - アクセシビリティ: role="dialog", aria-modal, aria-labelledby を指定
 * - variant で確認ボタンの見た目を変更可能（default = 青紫、danger = 赤系）
 */
"use client";

import { useCallback, useEffect } from "react";

/** 確認モーダルに渡す props */
interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "OK",
  cancelLabel = "キャンセル",
  variant = "default",
}: ConfirmModalProps) {
  /**
   * 確認ボタンクリック時: 先にモーダルを閉じてから onConfirm を実行する。
   * 閉じた後に親の状態更新が走るため、この順序にしている。
   */
  const handleConfirm = useCallback(() => {
    onClose();
    onConfirm();
  }, [onClose, onConfirm]);

  /**
   * モーダル表示中は Escape キーで閉じられるようにする。
   * クリーンアップでイベントリスナーを解除する。
   */
  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [open, onClose]);

  if (!open) return null;

  /** variant に応じた確認ボタンのクラス（danger は赤系グラデーション） */
  const confirmButtonClass =
    variant === "danger"
      ? "flex-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90"
      : "flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90";

  return (
    <>
      {/* オーバーレイ: クリックで閉じる。子要素のクリックは伝播させない */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        aria-describedby={description ? "confirm-modal-desc" : undefined}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
      {/* モーダル本体: ここをクリックしても閉じない */}
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-modal-title" className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p id="confirm-modal-desc" className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border-2 border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {cancelLabel}
          </button>
          <button type="button" onClick={handleConfirm} className={confirmButtonClass}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
