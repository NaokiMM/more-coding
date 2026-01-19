// ホームページ
import Link from "next/link";

export default function Home() {
  const technologies = [
    {
      id: "javascript",
      name: "JavaScript",
      description: "Web開発の基本となるプログラミング言語。動的なウェブサイトとアプリケーションを構築できます。",
      color: "from-yellow-500 to-orange-600",
      icon: "JS",
    },
    {
      id: "typescript",
      name: "TypeScript",
      description: "型安全性を持つJavaScriptのスーパーセット。大規模なアプリケーション開発に最適です。",
      color: "from-blue-500 to-blue-700",
      icon: "TS",
    },
    {
      id: "react",
      name: "React",
      description: "ユーザーインターフェース構築のためのJavaScriptライブラリ。コンポーネントベースの開発が可能です。",
      color: "from-cyan-500 to-blue-600",
      icon: "⚛️",
    },
    {
      id: "vue",
      name: "Vue.js",
      description: "プログレッシブなJavaScriptフレームワーク。段階的に採用できる柔軟性が特徴です。",
      color: "from-green-500 to-emerald-600",
      icon: "Vue",
    },
    {
      id: "nextjs",
      name: "Next.js",
      description: "Reactベースのフルスタックフレームワーク。SSR、SSG、APIルートなどの機能を提供します。",
      color: "from-gray-700 to-gray-900",
      icon: "▲",
    },
    {
      id: "nuxtjs",
      name: "Nuxt.js",
      description: "Vue.jsベースのフルスタックフレームワーク。SSR、静的サイト生成、モジュールシステムを提供します。",
      color: "from-green-600 to-emerald-700",
      icon: "ν",
    },
    {
      id: "devtools",
      name: "DevTool",
      description: "ブラウザの開発者ツールを活用して、デバッグ、パフォーマンス分析、ネットワーク監視などのスキルを身につけます。",
      color: "from-indigo-500 to-purple-600",
      icon: "🔧",
    },
    {
      id: "seo",
      name: "SEO",
      description: "検索エンジン最適化の基礎から実践まで。ウェブサイトの検索順位向上とアクセス数増加のスキルを身につけます。",
      color: "from-emerald-500 to-teal-600",
      icon: "🔍",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                SB
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                SkillBoost
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#technologies"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                学習できる技術・資格
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                ブログ
              </Link>
              <Link
                href="/company"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                会社概要
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                料金一覧
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                問い合わせ
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="/login/corporate"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                法人ログイン
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
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            エンジニアリング学習を用いて
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              スキルアップ
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            TypeScript、React、Vue.jsなどの最新技術を学びながら、
            <br />
            IT資格の取得を目指すプラットフォームです。
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="#technologies"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              学習を始める
            </Link>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            学習できる技術・資格
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            最新のフロントエンド・バックエンド技術を体系的に学べます
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => (
            <Link
              key={tech.id}
              href={`/learn/${tech.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:scale-105 hover:shadow-2xl dark:bg-slate-800"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 transition-opacity group-hover:opacity-10`} />
              <div className="relative">
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${tech.color} text-white text-2xl font-bold shadow-lg`}>
                  {tech.icon}
                </div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {tech.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {tech.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                  学習を始める
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="text-3xl font-bold sm:text-4xl">
            SkillBoostについて
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            IT資格の取得を目指す方のための学習プラットフォームです。
            <br />
            実践的な技術を学びながら、資格取得に必要な知識を身につけられます。
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="mb-4 flex items-center justify-center md:justify-start gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold">
                  SB
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  SkillBoost
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                IT資格の取得を目指す方のための学習プラットフォーム
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">サービス</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#technologies" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    学習できる技術・資格
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    ブログ
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    料金一覧
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    問い合わせ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">会社情報</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/company" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    会社概要
                  </Link>
                </li>
                <li>
                  <Link href="/login/corporate" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    法人ログイン
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">アカウント</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    ログイン
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                    会員登録
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              © 2026 SkillBoost. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
