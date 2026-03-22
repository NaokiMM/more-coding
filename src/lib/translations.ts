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
  | "home.hero.signupCta"
  | "home.hero.viewTechnologies"
  | "home.hero.signupHint"
  | "home.technologies.title"
  | "home.technologies.description"
  | "home.technologies.signupPrompt"
  | "home.technologies.getStarted"
  | "home.about.title"
  | "home.about.description"
  | "home.counseling.cta"
  | "home.counseling.button"
  | "home.recommend.title"
  | "home.recommend.item1"
  | "home.recommend.item2"
  | "home.recommend.item3"
  
  // Technologies
  | "tech.javascript.name"
  | "tech.javascript.description"
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
  | "tech.gin.name"
  | "tech.gin.description"
  | "tech.laravel.name"
  | "tech.laravel.description"
  | "tech.ai-interview.name"
  | "tech.ai-interview.description"
  | "tech.django.name"
  | "tech.django.description"

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
    "nav.technologies": "サービス・学習コンテンツ",
    "nav.blog": "ブログ",
    "nav.company": "事業概要",
    "nav.pricing": "料金一覧",
    "nav.contact": "問い合わせ",
    "nav.corporateLogin": "法人ログイン",
    "nav.login": "ログイン",
    "nav.signup": "会員登録",
    
    // Home Page
    "home.hero.title1": "エンジニアに特化した",
    "home.hero.title2": "AI面接サービス",
    "home.hero.description": "エンジニア職の面接を、AI相手にいつでも練習できます。\n面接対策に加え、技術学習コンテンツもご利用いただけます。",
    "home.hero.getStarted": "学習を始める",
    "home.hero.signupCta": "無料ではじめる",
    "home.hero.viewTechnologies": "サービス・学習内容を見る",
    "home.hero.signupHint": "会員登録は無料。登録後すぐに面接練習や学習を始められます",
    "home.technologies.title": "サービス・学習コンテンツ",
    "home.technologies.description": "本番を想定したAI面接練習を、体系的に積み上げられます",
    "home.technologies.signupPrompt": "無料会員登録で今すぐはじめる",
    "home.technologies.getStarted": "学習を始める",
    "home.about.title": "モアコーディングについて",
    "home.about.description": "エンジニアの就職・転職に役立つAI面接練習を提供しています。\n面接対策とあわせて、実践的な技術学習でスキルアップも図れます。",
    "home.counseling.cta": "30分初回無料カウンセリング\nMTGを受け付けています。\n面接・学習で不安がある方はぜひ一度ご連絡ください。",
    "home.counseling.button": "お問い合わせはこちら",
    "home.recommend.title": "モアコーディングは\nこんな方におすすめ！",
    "home.recommend.item1": "エンジニア面接の答え方や話し方に不安がある",
    "home.recommend.item2": "本番前に何度も面接練習をしたい",
    "home.recommend.item3": "技術学習と面接対策をまとめて進めたい",
    
    // Technologies
    "tech.javascript.name": "JavaScript",
    "tech.javascript.description": "Web開発の基本となるプログラミング言語。動的なウェブサイトとアプリケーションを構築できます。",
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
    "tech.gin.name": "Gin",
    "tech.gin.description": "Goの高速なWebフレームワーク。ルーティング、ミドルウェア、JSON API開発などのスキルを身につけます。",
    "tech.laravel.name": "Laravel",
    "tech.laravel.description": "PHPのモダンなWebアプリケーションフレームワーク。Eloquent ORM、ルーティング、ミドルウェア、認証などのスキルを身につけます。",
    "tech.ai-interview.name": "AI面接",
    "tech.ai-interview.description": "AIを活用した面接練習プラットフォーム。実践的な面接スキルを身につけ、就職・転職活動を成功させます。",
    "tech.django.name": "Django",
    "tech.django.description": "Pythonの高水準なWebアプリケーションフレームワーク。MVCパターン、ORM、管理画面などのスキルを身につけます。",
    
    // Footer
    "footer.tagline": "エンジニアの就職・転職に役立つAI面接練習と、実践的な技術学習を提供するサービス",
    "footer.services.title": "サービス",
    "footer.company.title": "事業情報",
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
    "nav.technologies": "Services & learning",
    "nav.blog": "Blog",
    "nav.company": "Company",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact",
    "nav.corporateLogin": "Corporate Login",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    
    // Home Page
    "home.hero.title1": "Engineer-focused",
    "home.hero.title2": "AI interview service",
    "home.hero.description": "Practice engineering interviews anytime with an AI interviewer.\nWe also offer technical learning content to support your growth.",
    "home.hero.getStarted": "Get Started",
    "home.hero.signupCta": "Start for Free",
    "home.hero.viewTechnologies": "View services & learning",
    "home.hero.signupHint": "Free to sign up. Start interview practice and learning right after registration.",
    "home.technologies.title": "Services & learning content",
    "home.technologies.description": "Build real interview skills with structured, practice-style AI interviews",
    "home.technologies.signupPrompt": "Sign up for free and get started now",
    "home.technologies.getStarted": "Get Started",
    "home.about.title": "About More Coding",
    "home.about.description": "We help engineers prepare for job searches and career moves with AI interview practice.\nCombine interview prep with hands-on technical learning.",
    "home.counseling.cta": "Book a free 30-minute\ncounseling session!\nReach out if you have concerns about interviews or learning.",
    "home.counseling.button": "Contact us",
    "home.recommend.title": "More Coding is\nrecommended for people like this",
    "home.recommend.item1": "Unsure how to answer or present yourself in engineering interviews",
    "home.recommend.item2": "Want to rehearse interviews many times before the real thing",
    "home.recommend.item3": "Want to tackle technical learning and interview prep in one place",
    
    // Technologies
    "tech.javascript.name": "JavaScript",
    "tech.javascript.description": "A fundamental programming language for web development. You can build dynamic websites and applications.",
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
    "tech.gin.name": "Gin",
    "tech.gin.description": "High-performance web framework for Go. Master skills such as routing, middleware, and JSON API development.",
    "tech.laravel.name": "Laravel",
    "tech.laravel.description": "Modern PHP web application framework. Master skills such as Eloquent ORM, routing, middleware, and authentication.",
    "tech.ai-interview.name": "AI Interview",
    "tech.ai-interview.description": "AI-powered interview practice platform. Master practical interview skills and succeed in job hunting and career change activities.",
    "tech.django.name": "Django",
    "tech.django.description": "High-level Python web application framework. Master skills such as MVC pattern, ORM, and admin interface.",
    
    // Footer
    "footer.tagline": "AI interview practice and hands-on technical learning for engineers",
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
