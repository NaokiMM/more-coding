/*
 FreeMemberUpgradeBanner
 --------------------
 無料会員ユーザー向けに表示するアップグレード案内バナー。

 【役割】
 - 現在が無料会員であることを明示する
 - 有料会員にアップグレードするメリットを簡潔に伝える
 - 料金ページ（/pricing）への導線を提供する

 【表示条件】
 - 会員種別が free の場合のみ、親コンポーネント側で表示制御する
 - 本コンポーネント自体では会員判定は行わない（表示専用）

 【補足】
 - CTA（アップグレードボタン）は視認性を重視した強調デザイン
*/

"use client";

import Link from "next/link";

export default function FreeMemberUpgradeBanner() {
  return (
    <div className="mb-8 rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 p-6 shadow-lg dark:border-slate-600 dark:from-slate-800 dark:to-slate-900">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-2xl shadow-lg">
            👤
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              無料会員プラン
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              現在無料プランをご利用中です。
              <br />
              有料会員にアップグレードすると、全てのコースにアクセスできます。
            </p>
          </div>
        </div>
        <Link
          href="/pricing"
          className="rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        >
          有料会員にアップグレード
        </Link>
      </div>
    </div>
  );
}
