import Link from "next/link";

export default function PricingPage() {
  const monthlyPlans = [
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
      buttonLink: "/signup",
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
      id: "premium",
      name: "プレミアムプラン",
      price: 1980,
      period: "月",
      description: "プロフェッショナル向けの充実プラン",
      features: [
        "全問題へのアクセス",
        "無制限の解答可能",
        "詳細な進捗分析",
        "学習レポートの生成",
        "優先サポート",
        "専属メンターとの相談",
        "模擬試験へのアクセス",
        "資格取得保証プログラム",
      ],
      color: "from-purple-500 to-pink-600",
      buttonText: "今すぐ始める",
      buttonLink: "/signup",
      popular: true,
    },
  ];

  const yearlyPlans = [
    {
      id: "free",
      name: "無料プラン",
      price: 0,
      period: "年",
      description: "基本的な学習コンテンツにアクセスできます",
      features: [
        "基本的な問題へのアクセス",
        "進捗状況の記録",
        "コミュニティフォーラムへの参加",
        "月10問まで解答可能",
      ],
      color: "from-slate-500 to-slate-600",
      buttonText: "無料で始める",
      buttonLink: "/signup",
    },
    {
      id: "basic",
      name: "ベーシックプラン",
      price: 9800,
      period: "年",
      originalPrice: 11760,
      discount: "17% OFF",
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
      id: "premium",
      name: "プレミアムプラン",
      price: 19800,
      period: "年",
      originalPrice: 23760,
      discount: "17% OFF",
      description: "プロフェッショナル向けの充実プラン",
      features: [
        "全問題へのアクセス",
        "無制限の解答可能",
        "詳細な進捗分析",
        "学習レポートの生成",
        "優先サポート",
        "専属メンターとの相談",
        "模擬試験へのアクセス",
        "資格取得保証プログラム",
      ],
      color: "from-purple-500 to-pink-600",
      buttonText: "今すぐ始める",
      buttonLink: "/signup",
      popular: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ホーム
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ログイン
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                会員登録
              </Link>
            </nav>
          </div>
        </div>
      </header>

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

      {/* Monthly Plans */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            月額プラン
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            月単位で契約できる柔軟なプラン
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {monthlyPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800 ${
                plan.popular ? "ring-2 ring-purple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-1 text-xs font-semibold text-white rounded-bl-lg">
                  おすすめ
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 transition-opacity hover:opacity-5`} />
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      ¥{plan.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-2">
                      /{plan.period}
                    </span>
                  </div>
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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Yearly Plans */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            年額プラン
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            年間契約でさらにお得に
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {yearlyPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800 ${
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
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  {plan.originalPrice && (
                    <div className="mb-2">
                      <span className="text-lg text-slate-400 line-through">
                        ¥{plan.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      ¥{plan.price.toLocaleString()}
                    </span>
                    <span className="text-lg text-slate-600 dark:text-slate-400 ml-2">
                      /{plan.period}
                    </span>
                  </div>
                  {plan.originalPrice && (
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

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                SB
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © 2024 SkillBoost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}