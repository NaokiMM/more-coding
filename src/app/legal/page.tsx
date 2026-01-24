// 特定商取引法に基づく表記ページ
import Link from "next/link";
import Header from "@/components/Header";

export default function LegalPage() {
  const companyInfo = {
    businessName: "松本尚輝",
    representative: "松本尚輝",
    address: "開示請求があった場合は、遅滞なく開示いたします。",
    phone: "開示請求があった場合は、遅滞なく開示いたします。",
  };

  const transactionInfo = {
    salesPrice: "各サービスプランの料金は、料金ページに記載の通りです。",
    paymentMethod: "クレジットカード決済（Visa、Mastercard、American Express、JCB）",
    paymentTiming: "サービス利用開始時、または各プランの更新時に自動的に決済されます。",
    serviceDelivery: "お支払い完了後、即座にサービスをご利用いただけます。",
    cancellationPolicy: "サービス開始後、ご利用期間に応じて返金いたします。詳細は利用規約をご確認ください。",
    returnPolicy: "デジタルコンテンツの性質上、原則として返品・返金はお受けできません。ただし、サービスに重大な不具合がある場合は、返金対応をいたします。",
    complaintHandling: "お客様からのご意見・ご要望は、お問い合わせフォームよりご連絡ください。",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            特定商取引法に基づく表記
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            モアコーディングのサービスに関する取引条件について
          </p>
        </div>
      </section>

      {/* Legal Information */}
      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
          <dl className="space-y-6">
            {/* 事業者名 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                事業者名
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.businessName}
              </dd>
            </div>

            {/* 代表者名 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                代表者名
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.representative}
              </dd>
            </div>

            {/* 所在地 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                所在地
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.address}
              </dd>
            </div>

            {/* 電話番号 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                電話番号
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {companyInfo.phone}
              </dd>
            </div>

            {/* 販売価格 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                販売価格
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {transactionInfo.salesPrice}
              </dd>
              <dd className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                <Link
                  href="/pricing"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  詳細は料金ページをご確認ください
                </Link>
              </dd>
            </div>

            {/* 支払方法 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                支払方法
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {transactionInfo.paymentMethod}
              </dd>
            </div>

            {/* 支払時期 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                支払時期
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {transactionInfo.paymentTiming}
              </dd>
            </div>

            {/* サービス提供時期 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                サービス提供時期
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {transactionInfo.serviceDelivery}
              </dd>
            </div>

            {/* キャンセル・返品ポリシー */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                キャンセル・返品について
              </dt>
              <dd className="text-base text-slate-900 dark:text-white mb-2">
                {transactionInfo.cancellationPolicy}
              </dd>
              <dd className="text-base text-slate-900 dark:text-white">
                {transactionInfo.returnPolicy}
              </dd>
            </div>

            {/* 苦情・相談窓口 */}
            <div>
              <dt className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">
                苦情・相談窓口
              </dt>
              <dd className="text-base text-slate-900 dark:text-white">
                {transactionInfo.complaintHandling}
              </dd>
              <dd className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  お問い合わせフォームはこちら
                </Link>
              </dd>
            </div>
          </dl>
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
