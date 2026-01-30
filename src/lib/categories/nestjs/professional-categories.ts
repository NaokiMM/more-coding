// NestJS Professionalのカテゴリデータ（s3-assets/nestjs/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "application-architecture-and-module-boundaries",
    name: "アプリケーションアーキテクチャとモジュール境界",
    file: "application-architecture-and-module-boundaries.json",
    icon: "🏗️",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "request-lifecycle-guards-interceptors-pipes",
    name: "リクエストライフサイクル・ガード・インターセプター・パイプ",
    file: "request-lifecycle-guards-interceptors-pipes.json",
    icon: "🔄",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "authentication-authorization-and-role-design",
    name: "認証・認可とロール設計",
    file: "authentication-authorization-and-role-design.json",
    icon: "🔐",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "custom-providers-and-advanced-di-patterns",
    name: "カスタムプロバイダーと高度なDIパターン",
    file: "custom-providers-and-advanced-di-patterns.json",
    icon: "💉",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "logging-metrics-and-exception-strategy",
    name: "ロギング・メトリクスと例外戦略",
    file: "logging-metrics-and-exception-strategy.json",
    icon: "📊",
    color: "from-blue-500 to-indigo-600",
  },
] as const;
