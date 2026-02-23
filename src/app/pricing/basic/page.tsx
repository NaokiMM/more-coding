// ベーシックプラン詳細ページ
"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const isDev = process.env.NODE_ENV === "development";

export default function BasicPlanPage() {
  const { user, loading } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const subscriptionType = user?.subscriptionType ?? "free";
  const isPaidMember = subscriptionType === "paid";

  // ローディング中の場合はローディング表示
  if (loading) {
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
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            ベーシックプラン
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            本格的に学習を始めたい方向けのプランです
          </p>
        </div>
      </section>

      {/* Plan Details Section */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Pricing */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <div className="mb-8 border-b border-slate-200 pb-8 dark:border-slate-700">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-slate-900 dark:text-white">
                  ¥980
                </span>
                <span className="text-xl text-slate-600 dark:text-slate-400 ml-2">
                  /月
                </span>
              </div>
              <p className="mt-4 text-center text-slate-600 dark:text-slate-400">
                本格的に学習を始めたい方向けのプランです
              </p>
              <div className="mt-8 flex flex-col items-center gap-2">
                {isPaidMember ? (
                  <>
                    <p className="rounded-lg bg-green-100 px-6 py-3 text-base font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      すでに有料会員です
                    </p>
                    <Link
                      href="/mypage"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      マイページへ
                    </Link>
                  </>
                ) : isDev ? (
                  <>
                    <Link
                      href="/signup"
                      className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                      申し込む
                    </Link>
                    <Link
                      href="/pricing/success"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      課金完了をテスト（POST /me/subscription）
                    </Link>
                  </>
                ) : (
                  <>
                    <span
                      className="inline-flex cursor-not-allowed items-center rounded-lg bg-slate-400 px-8 py-4 text-base font-semibold text-white opacity-90"
                      aria-disabled="true"
                    >
                      申し込む
                    </span>
                    <p className="text-sm text-slate-500 dark:text-slate-400">現在利用不可能</p>
                  </>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                プランの特徴
              </h2>
              <ul className="space-y-4">
                {[
                  "全問題へのアクセス",
                  "無制限の解答可能",
                  "詳細な進捗分析",
                  "学習レポートの生成",
                  "優先サポート",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-lg text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
                <li className="flex items-start">
                  <svg
                    className="h-6 w-6 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="text-lg text-slate-700 dark:text-slate-300">
                    AI面接は含まれません。
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Billing Terms */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              課金条件
            </h2>
            <div className="space-y-4">
              <ul className="ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
                <li>月額 ¥980（税込）</li>
                <li>毎月自動更新されます</li>
                <li>解約はいつでも可能です</li>
                <li>解約後も当月の終了日までご利用いただけます</li>
              </ul>
              <div className="mt-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-white">注意事項：</strong>
                  プランの変更や解約は、マイページの設定画面から行うことができます。解約手続き後も、既に支払い済みの期間中はサービスをご利用いただけます。
                </p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              支払い手段
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-slate-200 p-6 dark:border-slate-700">
                <div className="mb-4 flex items-center">
                  <svg
                    className="h-8 w-8 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    クレジットカード
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  Visa、Mastercard、American Express、JCB に対応しています
                </p>
              </div>
              <div className="rounded-xl border-2 border-slate-200 p-6 dark:border-slate-700">
                <div className="mb-4 flex items-center">
                  <svg
                    className="h-8 w-8 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    その他の決済方法
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  銀行振込、コンビニ決済にも対応しています（要問い合わせ）
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-blue-900 dark:text-blue-200">
                <strong>セキュリティ：</strong>
                すべての決済情報は暗号化され、安全に処理されます。お客様のカード情報は当社では保存いたしません。
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
              よくある質問
            </h2>
            <div className="space-y-2">
              {[
                {
                  question: "プランの変更はできますか？",
                  answer: "はい、マイページの設定画面からいつでもプランを変更できます。月額プランと年額プランの切り替えも可能です。",
                },
                {
                  question: "解約した場合、返金はありますか？",
                  answer: "月額プランの場合、解約後も当月の終了日までご利用いただけますが、既に支払い済みの料金の返金はございません。年額プランの場合も同様に、契約期間中はご利用いただけますが、返金はございません。",
                },
                {
                  question: "無料トライアルはありますか？",
                  answer: "現在、無料トライアルの提供はございません。ただし、無料プランで基本的な機能をお試しいただけます。",
                },
                {
                  question: "支払いが失敗した場合はどうなりますか？",
                  answer: "支払いが失敗した場合、お客様にメールでお知らせいたします。3日以内に支払いが完了しない場合、サービスが一時的に停止される場合があります。",
                },
                {
                  question: "年額プランから月額プランに変更できますか？",
                  answer: "はい、可能です。ただし、年額プランの残りの期間はそのままご利用いただけます。次回の更新日から月額プランに切り替わります。",
                },
                {
                  question: "複数のアカウントで同じプランを使えますか？",
                  answer: "いいえ、プランは1アカウントにつき1つのみです。複数のアカウントでご利用の場合は、それぞれにプランの登録が必要です。",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                    <svg
                      className={`h-5 w-5 text-slate-500 dark:text-slate-400 flex-shrink-0 transition-transform ${
                        openFaqIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openFaqIndex === index && (
                    <div className="px-4 pb-4">
                      <p className="text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Back Button */}
          <div className="flex justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
            >
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              料金一覧に戻る
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
