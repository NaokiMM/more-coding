/*
 ProfileSection
 --------------------
 マイページ上部に表示するプロフィール情報セクション。

 【表示内容】
 - ユーザー表示名（auth.name → name → email の順でフォールバック）
 - メールアドレス
 - 会員登録日
 - 会員種別（無料 / 有料）バッジ
 - プロフィール画像（ユーザー属性を優先、暫定的に localStorage をフォールバック）

 【役割】
 - 表示専用コンポーネント（データ取得・状態管理は行わない）
 - ログアウト処理は props 経由で受け取り、UIイベントのみを担当する
*/

"use client";

import Link from "next/link";

interface User {
  email?: string;
  name?: string;
  picture?: string;
  subscriptionType?: string;
  auth?: { name?: string | null };
  [key: string]: unknown;
}

interface ProfileSectionProps {
  user: User;
  onLogoutClick: () => void;
}

export default function ProfileSection({ user, onLogoutClick }: ProfileSectionProps) {
  const userDisplayName = user.auth?.name || user.name || user.email || "ユーザー";
  const userEmail = user.email || "";
  const joinDateRaw = user["custom:joinDate"];
  const joinDate =
    typeof joinDateRaw === "string" && joinDateRaw ? joinDateRaw : "不明";

  const subscriptionType = user.subscriptionType || "free";
  const membershipLabel =
    subscriptionType === "paid" ? "有料会員" : "無料会員";
  const membershipColor =
    subscriptionType === "paid"
      ? "bg-gradient-to-r from-yellow-500 to-orange-500"
      : "bg-gradient-to-r from-slate-500 to-slate-600";
  
  const profileImageRaw =
    user.picture ||
    user["custom:picture"] ||
    (typeof window !== "undefined" ? localStorage.getItem("profileImage") : null);
  const profileImage =
    typeof profileImageRaw === "string" ? profileImageRaw : null;

  return (
    <div className="mb-8 rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-6">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-2xl font-bold text-white">
            {profileImage ? (
              <img
                src={profileImage}
                alt={userDisplayName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{userDisplayName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {userDisplayName}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${membershipColor}`}
              >
                {membershipLabel}
              </span>
            </div>
            <p className="mt-1 text-slate-600 dark:text-slate-400">{userEmail}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
              会員登録日: {joinDate}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-row gap-3 md:mt-0">
          <Link
            href="/mypage/settings"
            className="rounded-lg border-2 border-slate-300 bg-white px-6 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
          >
            設定を編集
          </Link>
          <button
            onClick={onLogoutClick}
            className="rounded-lg border-2 border-red-300 bg-white px-6 py-2 text-sm font-semibold text-red-600 transition-all hover:bg-red-50 dark:border-red-600 dark:bg-slate-700 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}
