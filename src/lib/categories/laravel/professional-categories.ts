// Laravel Professionalのカテゴリデータ（s3-assets/laravel/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "application-structure-and-service-layer",
    name: "アプリケーション構造とサービス層",
    file: "application-structure-and-service-layer.json",
    icon: "🏗️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "authentication-authorization-and-guards",
    name: "認証・認可とガード",
    file: "authentication-authorization-and-guards.json",
    icon: "🔐",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "eloquent-relationships-and-query-optimization",
    name: "Eloquentリレーションシップとクエリ最適化",
    file: "eloquent-relationships-and-query-optimization.json",
    icon: "🔗",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "exception-handling-and-logging-strategy",
    name: "例外処理とロギング戦略",
    file: "exception-handling-and-logging-strategy.json",
    icon: "⚠️",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "request-validation-and-form-request-design",
    name: "リクエストバリデーションとフォームリクエスト設計",
    file: "request-validation-and-form-request-design.json",
    icon: "📋",
    color: "from-green-500 to-emerald-600",
  },
] as const;
