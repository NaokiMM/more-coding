// 料金ページ
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";

export default function PricingPage() {
  const router = useRouter();
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [calculatedUsd, setCalculatedUsd] = useState<number | null>(null);
  const [exchangeRateYearly, setExchangeRateYearly] = useState<string>("");
  const [calculatedUsdYearly, setCalculatedUsdYearly] = useState<number | null>(null);

  const handlePlanClick = (planId: string) => {
    if (planId === "basic") {
      // 月額ベーシックプランの詳細ページに遷移
      router.push("/pricing/basic");
    } else if (planId === "basic-yearly") {
      // 年額ベーシックプランの詳細ページに遷移
      router.push("/pricing/basic-yearly");
    }
  };

  const handleCalculateUsd = () => {
    const rate = parseFloat(exchangeRate);
    if (!isNaN(rate) && rate > 0) {
      const usdPrice = 980 / rate;
      setCalculatedUsd(usdPrice);
    }
  };

  const handleCalculateUsdYearly = () => {
    const rate = parseFloat(exchangeRateYearly);
    if (!isNaN(rate) && rate > 0) {
      const usdPrice = 9800 / rate;
      setCalculatedUsdYearly(usdPrice);
    }
  };

  const allPlans = [
    {
      id: "free",
      name: "無料プラン",
      price: 0,
      period: "月",
      description: "基本的な学習コンテンツにアクセスできます",
      features: [
        "基本的な問題へのアクセス",
        "進捗状況の記録",
        "コミュニティフォーラムへの参加",
        "月10問まで解答可能",
      ],
      color: "from-slate-500 to-slate-600",
      buttonText: "無料で始める",
      buttonLink: "/#technologies",
    },
    {
      id: "basic",
      name: "ベーシックプラン",
      price: 980,
      period: "月",
      description: "本格的に学習を始めたい方向け",
      features: [
        "全問題へのアクセス",
        "無制限の解答可能",
        "詳細な進捗分析",
        "学習レポートの生成",
        "優先サポート",
      ],
      color: "from-blue-500 to-blue-700",
      buttonText: "今すぐ始める",
      buttonLink: "/signup",
      popular: false,
    },
    {
      id: "basic-yearly",
      name: "ベーシックプラン（年額）",
      price: 9800,
      period: "年",
      originalPrice: 11760,
      discount: "17% OFF",
      description: "年間契約でさらにお得に",
      features: [
        "全問題へのアクセス",
        "無制限の解答可能",
        "詳細な進捗分析",
        "学習レポートの生成",
        "優先サポート",
      ],
      color: "from-blue-500 to-blue-700",
      buttonText: "今すぐ始める",
      buttonLink: "/signup",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            料金一覧
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            あなたの学習スタイルに合わせたプランをご用意しています
          </p>
        </div>
      </section>

      {/* Monthly/Yearly Plans */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            月額/年額プラン
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            あなたの学習スタイルに合わせたプランをご用意しています
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800 ${
                plan.popular ? "ring-2 ring-purple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-1 text-xs font-semibold text-white rounded-bl-lg">
                  おすすめ
                </div>
              )}
              {plan.discount && (
                <div className="absolute top-0 left-0 bg-red-500 px-4 py-1 text-xs font-semibold text-white rounded-br-lg">
                  {plan.discount}
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 transition-opacity hover:opacity-5`} />
              <div className="relative flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.id === "basic" ? (
                    <>
                      ベーシックプラン
                      <br />
                      （月額）
                    </>
                  ) : plan.id === "basic-yearly" ? (
                    <>
                      ベーシックプラン
                      <br />
                      （年額）
                    </>
                  ) : (
                    plan.name
                  )}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  {plan.originalPrice && plan.id !== "basic-yearly" && (
                    <div className="mb-2">
                      <span className="text-lg text-slate-400 line-through">
                        ¥{plan.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {plan.id === "free" ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        ¥{plan.price.toLocaleString()} / $0
                      </span>
                      <span className="text-lg text-slate-600 dark:text-slate-400 ml-2">
                        /{plan.period}
                      </span>
                    </div>
                  ) : plan.id === "basic" ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">¥円: </span>
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">
                          {plan.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
                          /{plan.period}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">$USD: </span>
                          <input
                            type="number"
                            value={exchangeRate}
                            onChange={(e) => setExchangeRate(e.target.value)}
                            placeholder="為替レート"
                            className="w-24 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">/Month</span>
                        </div>
                        <button
                          onClick={handleCalculateUsd}
                          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                        >
                          Calculate
                        </button>
                        {calculatedUsd !== null && (
                          <div className="text-center">
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                              ${calculatedUsd.toFixed(2)}
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">/Month</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : plan.id === "basic-yearly" ? (
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">¥円: </span>
                        <span className="text-4xl font-bold text-slate-900 dark:text-white">
                          {plan.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">
                          /{plan.period}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">$USD: </span>
                          <input
                            type="number"
                            value={exchangeRateYearly}
                            onChange={(e) => setExchangeRateYearly(e.target.value)}
                            placeholder="為替レート"
                            className="w-24 rounded-md border border-slate-300 px-3 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">/Year</span>
                        </div>
                        <button
                          onClick={handleCalculateUsdYearly}
                          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                        >
                          Calculate
                        </button>
                        {calculatedUsdYearly !== null && (
                          <div className="text-center">
                            <span className="text-lg font-semibold text-slate-900 dark:text-white">
                              ${calculatedUsdYearly.toFixed(2)}
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-400 ml-1">/Year</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-slate-900 dark:text-white">
                        ¥{plan.price.toLocaleString()}
                      </span>
                      <span className="text-lg text-slate-600 dark:text-slate-400 ml-2">
                        /{plan.period}
                      </span>
                    </div>
                  )}
                  {plan.originalPrice && plan.id !== "basic-yearly" && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      月額換算: ¥{Math.round(plan.price / 12).toLocaleString()}/月
                    </p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
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
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  {plan.id === "basic" || plan.id === "basic-yearly" ? (
                    <button
                      onClick={() => handlePlanClick(plan.id)}
                      className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-r ${plan.color} text-white`}
                    >
                      {plan.buttonText}
                    </button>
                  ) : (
                    <Link
                      href={plan.buttonLink}
                      className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg ${
                        plan.id === "free"
                          ? "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                          : `bg-gradient-to-r ${plan.color} text-white`
                      }`}
                    >
                      {plan.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home Section */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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
            ホームへ戻る
          </Link>
        </div>
      </section>
    </div>
  );
}