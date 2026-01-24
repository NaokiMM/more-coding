export type TranslationKey = 
  // Navigation
  | "nav.home"
  | "nav.technologies"
  | "nav.blog"
  | "nav.company"
  | "nav.pricing"
  | "nav.contact"
  | "nav.corporateLogin"
  | "nav.login"
  | "nav.signup"
  
  // Home Page
  | "home.hero.title1"
  | "home.hero.title2"
  | "home.hero.description"
  | "home.hero.getStarted"
  | "home.technologies.title"
  | "home.technologies.description"
  | "home.technologies.getStarted"
  | "home.about.title"
  | "home.about.description"
  
  // Technologies
  | "tech.javascript.name"
  | "tech.javascript.description"
  | "tech.typescript.name"
  | "tech.typescript.description"
  | "tech.react.name"
  | "tech.react.description"
  | "tech.vue.name"
  | "tech.vue.description"
  | "tech.nextjs.name"
  | "tech.nextjs.description"
  | "tech.nuxtjs.name"
  | "tech.nuxtjs.description"
  | "tech.devtools.name"
  | "tech.devtools.description"
  | "tech.seo.name"
  | "tech.seo.description"
  | "tech.nodejs.name"
  | "tech.nodejs.description"
  | "tech.nestjs.name"
  | "tech.nestjs.description"
  | "tech.express.name"
  | "tech.express.description"
  | "tech.laravel.name"
  | "tech.laravel.description"
  
  // Footer
  | "footer.tagline"
  | "footer.services.title"
  | "footer.company.title"
  | "footer.account.title"
  | "footer.copyright"
  
  // Common
  | "common.loading"
  | "common.user"
  | "common.unknown";

export const translations = {
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.technologies": "学習できる技術・資格",
    "nav.blog": "ブログ",
    "nav.company": "会社概要",
    "nav.pricing": "料金一覧",
    "nav.contact": "問い合わせ",
    "nav.corporateLogin": "法人ログイン",
    "nav.login": "ログイン",
    "nav.signup": "会員登録",
    
    // Home Page
    "home.hero.title1": "エンジニアリング学習を用いて",
    "home.hero.title2": "スキルアップ",
    "home.hero.description": "TypeScript、React、Vue.jsなどの最新技術を学びながら、\nIT資格の取得を目指すプラットフォームです。",
    "home.hero.getStarted": "学習を始める",
    "home.technologies.title": "学習できる技術・資格",
    "home.technologies.description": "最新のフロントエンド・バックエンド技術を体系的に学べます",
    "home.technologies.getStarted": "学習を始める",
    "home.about.title": "モアコーディングについて",
    "home.about.description": "IT資格の取得を目指す方のための学習プラットフォームです。\n実践的な技術を学びながら、資格取得に必要な知識を身につけられます。",
    
    // Technologies
    "tech.javascript.name": "JavaScript",
    "tech.javascript.description": "Web開発の基本となるプログラミング言語。動的なウェブサイトとアプリケーションを構築できます。",
    "tech.typescript.name": "TypeScript",
    "tech.typescript.description": "型安全性を持つJavaScriptのスーパーセット。大規模なアプリケーション開発に最適です。",
    "tech.react.name": "React",
    "tech.react.description": "ユーザーインターフェース構築のためのJavaScriptライブラリ。コンポーネントベースの開発が可能です。",
    "tech.vue.name": "Vue.js",
    "tech.vue.description": "プログレッシブなJavaScriptフレームワーク。段階的に採用できる柔軟性が特徴です。",
    "tech.nextjs.name": "Next.js",
    "tech.nextjs.description": "Reactベースのフルスタックフレームワーク。SSR、SSG、APIルートなどの機能を提供します。",
    "tech.nuxtjs.name": "Nuxt.js",
    "tech.nuxtjs.description": "Vue.jsベースのフルスタックフレームワーク。SSR、静的サイト生成、モジュールシステムを提供します。",
    "tech.devtools.name": "DevTools",
    "tech.devtools.description": "ブラウザの開発者ツールを活用して、デバッグ、パフォーマンス分析、ネットワーク監視などのスキルを身につけます。",
    "tech.seo.name": "SEO",
    "tech.seo.description": "検索エンジン最適化の基礎から実践まで。ウェブサイトの検索順位向上とアクセス数増加のスキルを身につけます。",
    "tech.nodejs.name": "Node.js",
    "tech.nodejs.description": "サーバーサイドJavaScriptランタイム。非同期処理、ファイルシステム操作、HTTPサーバー構築などのスキルを身につけます。",
    "tech.nestjs.name": "NestJS",
    "tech.nestjs.description": "TypeScriptベースのNode.jsフレームワーク。モジュール、コントローラー、サービス、依存性注入などのエンタープライズレベルのアプリケーション開発を学びます。",
    "tech.express.name": "Express.js",
    "tech.express.description": "Node.jsの軽量で柔軟なWebアプリケーションフレームワーク。ルーティング、ミドルウェア、テンプレートエンジンなどのスキルを身につけます。",
    "tech.laravel.name": "Laravel",
    "tech.laravel.description": "PHPのモダンなWebアプリケーションフレームワーク。Eloquent ORM、ルーティング、ミドルウェア、認証などのスキルを身につけます。",
    
    // Footer
    "footer.tagline": "IT資格の取得を目指す方のための学習プラットフォーム",
    "footer.services.title": "サービス",
    "footer.company.title": "会社情報",
    "footer.account.title": "アカウント",
    "footer.copyright": "© 2026 More Coding. All rights reserved.",
    
    // Common
    "common.loading": "読み込み中...",
    "common.user": "ユーザー",
    "common.unknown": "不明",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.technologies": "Technologies & Certifications",
    "nav.blog": "Blog",
    "nav.company": "Company",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.corporateLogin": "Corporate Login",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    
    // Home Page
    "home.hero.title1": "Boost Your Skills with",
    "home.hero.title2": "Engineering Learning",
    "home.hero.description": "Learn the latest technologies like TypeScript, React, and Vue.js while aiming to obtain IT certifications on our platform.",
    "home.hero.getStarted": "Get Started",
    "home.technologies.title": "Technologies & Certifications You Can Learn",
    "home.technologies.description": "Systematically learn the latest frontend and backend technologies",
    "home.technologies.getStarted": "Get Started",
    "home.about.title": "About More Coding",
    "home.about.description": "A learning platform for those aiming to obtain IT certifications.\nLearn practical technologies while acquiring the knowledge necessary for certification.",
    
    // Technologies
    "tech.javascript.name": "JavaScript",
    "tech.javascript.description": "A fundamental programming language for web development. You can build dynamic websites and applications.",
    "tech.typescript.name": "TypeScript",
    "tech.typescript.description": "A superset of JavaScript with type safety. Ideal for large-scale application development.",
    "tech.react.name": "React",
    "tech.react.description": "A JavaScript library for building user interfaces. Enables component-based development.",
    "tech.vue.name": "Vue.js",
    "tech.vue.description": "A progressive JavaScript framework. Characterized by the flexibility to adopt gradually.",
    "tech.nextjs.name": "Next.js",
    "tech.nextjs.description": "A React-based full-stack framework. Provides features like SSR, SSG, and API routes.",
    "tech.nuxtjs.name": "Nuxt.js",
    "tech.nuxtjs.description": "A Vue.js-based full-stack framework. Provides SSR, static site generation, and a module system.",
    "tech.devtools.name": "DevTools",
    "tech.devtools.description": "Master skills such as debugging, performance analysis, and network monitoring by utilizing browser developer tools.",
    "tech.seo.name": "SEO",
    "tech.seo.description": "From basics to practice of search engine optimization. Master skills to improve website search rankings and increase traffic.",
    "tech.nodejs.name": "Node.js",
    "tech.nodejs.description": "Server-side JavaScript runtime. Master skills such as asynchronous processing, file system operations, and HTTP server construction.",
    "tech.nestjs.name": "NestJS",
    "tech.nestjs.description": "TypeScript-based Node.js framework. Learn enterprise-level application development with modules, controllers, services, and dependency injection.",
    "tech.express.name": "Express.js",
    "tech.express.description": "Lightweight and flexible web application framework for Node.js. Master skills such as routing, middleware, and template engines.",
    "tech.laravel.name": "Laravel",
    "tech.laravel.description": "Modern PHP web application framework. Master skills such as Eloquent ORM, routing, middleware, and authentication.",
    
    // Footer
    "footer.tagline": "A learning platform for those aiming to obtain IT certifications",
    "footer.services.title": "Services",
    "footer.company.title": "Company",
    "footer.account.title": "Account",
    "footer.copyright": "© 2026 More Coding. All rights reserved.",
    
    // Common
    "common.loading": "Loading...",
    "common.user": "User",
    "common.unknown": "Unknown",
  },
};

export function useTranslation(language: "ja" | "en") {
  return (key: TranslationKey): string => {
    return translations[language][key] || key;
  };
}
