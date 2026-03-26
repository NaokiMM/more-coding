/**
 * 広告バナーコンポーネント
 *
 * ITエンジニア向け転職サイト・プログラミングスクールの広告を表示します。
 * 横並びで3つの広告カードを表示します（1つ目: キャリアカンパニー、2つ目: A8.net、3つ目: A8.net 広告）。
 */

"use client";

import CareerCompanyAd from "./ads/CareerCompanyAd";
import NewA8Ad from "./ads/NewA8Ad";
import ThirdA8Ad from "./ads/ThirdA8Ad";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function AdBanner() {
  const { language } = useLanguage();
  const tKey = (key: string) => t(language, key);

  return (
    <div className="mt-6 mb-4">
      {/* 見出し */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          {tKey("home.adBanner.title")}
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {tKey("home.adBanner.description")}
        </p>
      </div>

      {/* 広告カード: 1つ目=キャリアカンパニー、2つ目=A8.net、3つ目=A8.net */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1つ目: キャリアカンパニー（A8.net） */}
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800">
          <div className="flex justify-center p-4">
            <CareerCompanyAd />
          </div>
          <div className="px-6 pb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              転職支援
            </span>
            <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              広告：株式会社エンデバース／キャリアカンパニー
            </p>
          </div>
        </div>

        {/* 2つ目: 新規A8.net広告（セキュリティプロ・フリーランス） */}
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800">
          <div className="flex justify-center p-4">
            <NewA8Ad />
          </div>
          <div className="px-6 pb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              フリーランス
            </span>
            <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              広告：セキュリティ案件紹介サービス
            </p>
          </div>
        </div>

        {/* 3つ目: 新規 A8.net 広告 */}
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800">
          <div className="flex justify-center p-4">
            <ThirdA8Ad />
          </div>
          <div className="px-6 pb-6">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              プログラミング学習
            </span>
            <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
              広告：A8.net 提携サービス
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
