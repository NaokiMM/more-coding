// Django Expertのカテゴリデータ（s3-assets/django/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "request-response-lifecycle-and-middleware-analysis",
    name: "リクエスト・レスポンスライフサイクルとミドルウェア分析",
    file: "request-response-lifecycle-and-middleware-analysis.json",
    icon: "🔄",
    color: "from-green-600 to-teal-600",
  },
  {
    id: "orm-internals-and-query-performance-tuning",
    name: "ORM内部とクエリパフォーマンスチューニング",
    file: "orm-internals-and-query-performance-tuning.json",
    icon: "🗄️",
    color: "from-teal-500 to-green-600",
  },
  {
    id: "template-rendering-engine-and-performance",
    name: "テンプレートレンダリングエンジンとパフォーマンス",
    file: "template-rendering-engine-and-performance.json",
    icon: "🎨",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "large-scale-app-structure-and-domain-design",
    name: "大規模アプリ構造とドメイン設計",
    file: "large-scale-app-structure-and-domain-design.json",
    icon: "🏗️",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "deployment-security-and-settings-internals",
    name: "デプロイ・セキュリティと設定内部",
    file: "deployment-security-and-settings-internals.json",
    icon: "🛡️",
    color: "from-teal-600 to-emerald-800",
  },
] as const;
