// Laravel Expertのカテゴリデータ（s3-assets/laravel/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "eloquent-internals-and-database-performance-tuning",
    name: "Eloquent内部構造とデータベースパフォーマンスチューニング",
    file: "eloquent-internals-and-database-performance-tuning.json",
    icon: "⚡",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "http-kernel-middleware-and-request-lifecycle",
    name: "HTTPカーネル、ミドルウェア、リクエストライフサイクル",
    file: "http-kernel-middleware-and-request-lifecycle.json",
    icon: "🔄",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "scaling-strategies-queues-cache-and-jobs",
    name: "スケーリング戦略、キュー、キャッシュ、ジョブ",
    file: "scaling-strategies-queues-cache-and-jobs.json",
    icon: "📈",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "security-hardening-and-framework-internals",
    name: "セキュリティ強化とフレームワーク内部構造",
    file: "security-hardening-and-framework-internals.json",
    icon: "🛡️",
    color: "from-green-600 to-emerald-600",
  },
  {
    id: "service-container-and-dependency-injection-internals",
    name: "サービスコンテナと依存性注入の内部構造",
    file: "service-container-and-dependency-injection-internals.json",
    icon: "🔧",
    color: "from-slate-600 to-blue-600",
  },
] as const;
