// 設定・アカウント情報

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import SettingsLayout from "@/components/SettingsLayout";
import { getSession } from "@/lib/cognito";

export default function AccountSettingsPage() {
  const { user, refreshUser } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccessMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const session = await getSession();
      if (!session) throw new Error("認証が必要です");

      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (!apiBaseUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
      }

      const response = await fetch(`${apiBaseUrl}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.idToken}`,
        },
        body: JSON.stringify({ name: formData.name }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "設定の更新に失敗しました");
      }

      setSuccessMessage("アカウント情報を更新しました");
      await refreshUser();
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "設定の更新に失敗しました",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SettingsLayout
      breadcrumbTail="アカウント情報"
      title="アカウント情報"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                お名前
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className={`block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500 dark:border-red-500"
                    : "border-slate-300 dark:border-slate-600"
                }`}
                placeholder="山田 太郎"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
              >
                メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                readOnly
                className="block w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-slate-500 dark:border-slate-600 dark:bg-slate-700/50 dark:text-slate-400 cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                メールアドレスは変更できません
              </p>
            </div>
          </div>
        </section>

        {successMessage && (
          <div className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
            {successMessage}
          </div>
        )}
        {errors.submit && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {errors.submit}
          </div>
        )}

        {/* 開発環境のみ表示（next dev のとき NODE_ENV=development のため表示） */}
        {/* NODE_ENV は Next.js が自動設定する組み込み環境変数のため .env 定義は不要 */}
        {process.env.NODE_ENV === "development" && (
          <section className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-900/20">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">
              開発用
            </h3>
            <button
              type="button"
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
            >
              課金処理
            </button>
          </section>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <Link
            href="/mypage/settings"
            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            設定に戻る
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? "保存中..." : "変更を保存"}
          </button>
        </div>
      </form>
    </SettingsLayout>
  );
}
