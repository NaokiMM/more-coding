/**
 * 広告バナーコンポーネント
 *
 * ITエンジニア向け転職サイト・プログラミングスクールの広告を表示します。
 * 横並びで3つの広告カードを表示します（1つ目: キャリアカンパニー、2・3つ目: 掲載予定）。
 */

import CareerCompanyAd from "./ads/CareerCompanyAd";

const placeholderAds = [
  {
    id: 2,
    title: "プログラミングスクール",
    description: "実践的なスキルを身につけよう",
    type: "スクール",
  },
  {
    id: 3,
    title: "ITエンジニア向け転職サイト",
    description: "キャリアアップのチャンスを掴もう",
    type: "転職サイト",
  },
];

export default function AdBanner() {
  return (
    <div className="mt-6 mb-4">
      {/* 見出し */}
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          おすすめの転職サイト・スクール
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          ITエンジニアのキャリアアップをサポートするサービスをご紹介
        </p>
      </div>

      {/* 広告カード: 1つ目=キャリアカンパニー、2・3つ目=掲載予定 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1つ目: キャリアカンパニー（A8.net） */}
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800">
          <div className="p-4">
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

        {/* 2・3つ目: プレースホルダー */}
        {placeholderAds.map((ad) => (
          <div
            key={ad.id}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
          >
            <div className="h-48 w-full bg-black dark:bg-slate-900 flex items-center justify-center">
              <div className="text-white/50 dark:text-slate-500 text-sm font-medium">
                広告掲載予定
              </div>
            </div>
            <div className="p-6">
              <div className="mb-2">
                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {ad.type}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                {ad.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {ad.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
