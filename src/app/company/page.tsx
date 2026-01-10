// 会社概要ページ
import Link from "next/link";

export default function CompanyPage() {
  const companyInfo = {
    name: "SkillBoost株式会社",
    nameEn: "SkillBoost Inc.",
    established: "2024年4月",
    capital: "1,000万円",
    address: "〒100-0001 東京都千代田区千代田1-1-1",
    representative: "代表取締役 CEO 山田 太郎",
    employees: "10名",
    business: "IT資格学習プラットフォームの運営・開発",
  };

  const vision = {
    title: "ビジョン",
    description: "すべてのエンジニアが、より良いキャリアを築くための知識とスキルを身につけられる世界を実現します。",
  };

  const mission = {
    title: "ミッション",
    description: "最新の技術トレンドを反映した高品質な学習コンテンツを提供し、エンジニアのスキルアップとキャリア成長を支援します。",
  };

  const values = [
    {
      title: "質の高い学習",
      description: "業界の最新トレンドを反映した、実践的な学習コンテンツを提供します。",
      icon: "📚",
    },
    {
      title: "継続的な改善",
      description: "ユーザーフィードバックを基に、常にサービスを向上させます。",
      icon: "🚀",
    },
    {
      title: "コミュニティ重視",
      description: "学習者同士が支え合い、成長できるコミュニティを育成します。",
      icon: "🤝",
    },
    {
      title: "技術の民主化",
      description: "誰もが技術を学び、エンジニアリングスキルを身につけられる環境を作ります。",
      icon: "🌍",
    },
  ];

  const businessAreas = [
    {
      title: "オンライン学習プラットフォーム",
      description: "IT資格取得に向けた体系的な学習コンテンツの提供",
    },
    {
      title: "問題集・模擬試験サービス",
      description: "各種IT資格試験に対応した問題集と模擬試験の提供",
    },
    {
      title: "学習進捗管理システム",
      description: "個人の学習進捗を可視化し、効率的な学習をサポート",
    },
    {
      title: "エンジニアコミュニティ運営",
      description: "学習者同士の交流と知識共有を促進するコミュニティの運営",
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
            会社概要
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            ITエンジニアのスキルアップとキャリア成長を支援する学習プラットフォーム
          </p>
        </div>
      </section>

      {/* Company Information */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            会社情報
          </h2>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                会社名
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.name}
              </dd>
              <dd className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {companyInfo.nameEn}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                設立
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.established}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                資本金
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.capital}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                従業員数
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.employees}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                代表者
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.representative}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                所在地
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.address}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                事業内容
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.business}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{vision.title}</h2>
            <p className="text-lg leading-relaxed opacity-90">
              {vision.description}
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{mission.title}</h2>
            <p className="text-lg leading-relaxed opacity-90">
              {mission.description}
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            私たちの価値観
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            SkillBoostが大切にする4つの価値観
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Business Areas */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            事業領域
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            当社が提供する主要なサービス領域
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {businessAreas.map((area, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {area.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {area.description}
              </p>
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