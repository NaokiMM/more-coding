/**
 * Header コンポーネント
 *
 * サイト共通の固定ヘッダー。左にロゴ（More Coding）、右に認証ナビ（ログイン時: マイページ・ログアウト、未ログイン時: ログイン・新規登録）を表示する。
 * rightContent を渡すと、PCではその内容を右側に表示し、スマホでは認証ナビを表示する。ログアウト時は ConfirmModal で確認してからトップへ遷移する。
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import ConfirmModal from "@/components/ConfirmModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface HeaderProps {
  rightContent?: React.ReactNode;
}

export default function Header({ rightContent }: HeaderProps) {
  const { isAuthenticated, loading, signOut } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const tKey = (key: string) => t(language, key);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleLogoutConfirm = () => {
    signOut();
    router.push("/");
  };

  // 共通の認証ナビ（ログイン時: マイページ+ログアウト、未ログイン: ログイン・新規登録）
  const authNav = (
    <nav className="flex items-center gap-3 sm:gap-6">
      {isAuthenticated ? (
        <>
          <Link
            href="/mypage"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            {tKey("nav.mypage")}
          </Link>
          <button
            onClick={handleLogoutClick}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            {tKey("nav.logout")}
          </button>
        </>
      ) : (
        <>
          <Link
            href="/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            {tKey("nav.login")}
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-2 sm:px-4 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
          >
            {tKey("nav.signup")}
          </Link>
        </>
      )}
    </nav>
  );

  const headerInner = (
    <>
      <Link href="/" className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
          MC
        </div>
        <span className="text-xl font-bold text-slate-900 dark:text-white">
          {tKey("serviceTitle")}
        </span>
      </Link>
      <div className="flex items-center gap-3 sm:gap-4">
        <LanguageSwitcher />
        {rightContent ? (
          <>
            {/* スマホ: 共通の認証ナビを表示 */}
            <div className="flex md:hidden">{authNav}</div>
            {/* PC: カスタムrightContentを表示 */}
            <div className="hidden md:flex md:items-center md:gap-6">
              {rightContent}
            </div>
          </>
        ) : (
          authNav
        )}
      </div>
    </>
  );

  // カスタムrightContentが指定されている場合は、スマホで共通ナビ・PCでrightContent
  if (rightContent) {
    return (
      <>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {headerInner}
            </div>
          </div>
        </header>
        <ConfirmModal
          open={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogoutConfirm}
          title={tKey("modal.logoutConfirmTitle")}
          confirmLabel={tKey("modal.logout")}
          cancelLabel={tKey("modal.cancel")}
        />
      </>
    );
  }

  // ローディング中は右側を空にしてフラッシュを防ぐ
  if (loading) {
    return (
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-lg">
                MC
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {tKey("serviceTitle")}
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {headerInner}
          </div>
        </div>
      </header>
      <ConfirmModal
        open={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogoutConfirm}
        title={tKey("modal.logoutConfirmTitle")}
        confirmLabel={tKey("modal.logout")}
        cancelLabel={tKey("modal.cancel")}
      />
    </>
  );
}
