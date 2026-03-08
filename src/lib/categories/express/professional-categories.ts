// Express.js Professionalのカテゴリデータ（s3-assets/expressjs/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "project-structure-and-layered-architecture",
    name: "プロジェクト構造とレイヤードアーキテクチャ",
    file: "project-structure-and-layered-architecture.json",
    icon: "🏗️",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "middleware-composition-and-lifecycle",
    name: "ミドルウェアの構成とライフサイクル",
    file: "middleware-composition-and-lifecycle.json",
    icon: "🛤️",
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "rest-api-design-and-validation",
    name: "REST API 設計とバリデーション",
    file: "rest-api-design-and-validation.json",
    icon: "📨",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "authentication-authorization-flow",
    name: "認証・認可フロー",
    file: "authentication-authorization-flow.json",
    icon: "🔐",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "centralized-error-handling-and-logging",
    name: "集中エラーハンドリングとロギング",
    file: "centralized-error-handling-and-logging.json",
    icon: "🛡️",
    color: "from-green-500 to-emerald-600",
  },
] as const;
