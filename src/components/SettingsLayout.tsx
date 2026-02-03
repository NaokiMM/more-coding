"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

interface SettingsLayoutProps {
  /** パンくずの最後のセグメント（例: "アカウント情報"）。省略時は「設定」が現在地 */
  breadcrumbTail?: string;
  /** メインの見出し */
  title?: string;
  /** true のとき「設定」をリンクにしない（設定トップのとき） */
  isSettingsIndex?: boolean;
  children: React.ReactNode;
}

export default function SettingsLayout({
  breadcrumbTail,
  title,
  isSettingsIndex,
  children,
}: SettingsLayoutProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-slate-600 dark:text-slate-400">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Link
            href="/mypage"
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            マイページ
          </Link>
          <span aria-hidden>/</span>
          {isSettingsIndex ? (
            <span className="text-slate-700 dark:text-slate-300 font-medium">設定</span>
          ) : (
            <Link
              href="/mypage/settings"
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              設定
            </Link>
          )}
          {breadcrumbTail && (
            <>
              <span aria-hidden>/</span>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                {breadcrumbTail}
              </span>
            </>
          )}
        </nav>
        {title && (
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            {title}
          </h1>
        )}
        {children}
      </div>
    </div>
  );
}
