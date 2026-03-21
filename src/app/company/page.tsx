// 事業概要ページ
import Link from "next/link";
import Header from "@/components/Header";

export default function CompanyPage() {
  const companyInfo = {
    name: "松本尚輝",
    nameEn: "Naoki Matsumoto",
    established: "2026年1月",
    address: "開示請求があった場合は、遅滞なく開示いたします。",
    phone: "開示請求があった場合は、遅滞なく開示いたします。",
    representative: "松本尚輝",
    business: "エンジニア向けAI面接練習サービスおよびオンライン技術学習プラットフォームの運営・開発",
  };

  const vision = {
    title: "ビジョン",
    description: "すべてのエンジニアが、より良いキャリアを築くための知識とスキルを身につけられる世界を実現します。",
  };

  const mission = {
    title: "ミッション",
    description: "AI面接練習と技術学習コンテンツを通じて、エンジニアの採用・転職成功と継続的なスキルアップを支援します。",
  };

  const values = [
    {
      title: "実践に直結する面接・学習体験",
      description: "AI面接と技術学習の両面から、現場で役立つ力を身につけられるよう設計しています。",
      icon: "📚",
    },
    {
      title: "継続的な改善",
      description: "ユーザーフィードバックを基に、常にサービスを向上させます。",
      icon: "🚀",
    },
    {
      title: "技術の民主化",
      description: "誰もが技術を学び、エンジニアリングスキルを身につけられる環境を作ります。",
      icon: "🌍",
    },
  ];

  const businessAreas = [
    {
      title: "AI面接練習サービス",
      description: "エンジニア職向けの面接をAIと繰り返し練習できる機能の提供",
    },
    {
      title: "オンライン技術学習・資格対策",
      description: "フロントエンド・バックエンド等の体系的な学習コンテンツ、問題集・模擬試験の提供",
    },
    {
      title: "学習進捗管理",
      description: "個人の学習進捗を可視化し、効率的な学習と面接準備をサポート",
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
            事業概要
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            エンジニアの面接準備とスキルアップを<br />一体で支援するプラットフォーム
          </p>
        </div>
      </section>

      {/* Company Information */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            事業情報
          </h2>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                事業者名
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
                電話番号
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.phone}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                お問い合わせ
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                お問い合わせフォームより
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  ご連絡ください。
                </Link>
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
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{vision.title}</h2>
            <p className="text-lg leading-relaxed opacity-90">
              {vision.description}
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-slate-700 to-blue-600 p-8 text-white shadow-lg">
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
            モアコーディングが大切にする3つの価値観
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
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
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