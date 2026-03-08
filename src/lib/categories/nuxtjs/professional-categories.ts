// Nuxt.js Professionalのカテゴリデータ（s3-assets/nuxtjs/professional/*.json5 を .json で配信する想定）
export const categoriesData = [
  {
    id: "project-structure-and-application-architecture",
    name: "プロジェクト構造とアプリケーションアーキテクチャ",
    file: "project-structure-and-application-architecture.json",
    icon: "🏗️",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "rest-api-design-and-validation",
    name: "REST API 設計とバリデーション",
    file: "rest-api-design-and-validation.json",
    icon: "🔌",
    color: "from-cyan-500 to-sky-600",
  },
  {
    id: "error-handling-and-logging-strategy",
    name: "エラーハンドリングとロギング戦略",
    file: "error-handling-and-logging-strategy.json",
    icon: "⚠️",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "authentication-and-authorization-patterns",
    name: "認証と認可パターン",
    file: "authentication-and-authorization-patterns.json",
    icon: "🔐",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "testing-and-debugging",
    name: "テストとデバッグ",
    file: "testing-and-debugging.json",
    icon: "🧪",
    color: "from-slate-600 to-blue-600",
  },
] as const;
