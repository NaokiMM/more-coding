// Django Professionalのカテゴリデータ（s3-assets/django/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "apps-architecture-and-reusability",
    name: "アプリのアーキテクチャと再利用性",
    file: "apps-architecture-and-reusability.json",
    icon: "📦",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "models-relations-and-query-optimization",
    name: "モデル・リレーションとクエリ最適化",
    file: "models-relations-and-query-optimization.json",
    icon: "🗄️",
    color: "from-green-600 to-teal-600",
  },
  {
    id: "views-class-based-views-and-routing-patterns",
    name: "ビュー・クラスベースビューとルーティングパターン",
    file: "views-class-based-views-and-routing-patterns.json",
    icon: "🔗",
    color: "from-teal-500 to-green-600",
  },
  {
    id: "templates-inheritance-and-context-design",
    name: "テンプレート継承とコンテキスト設計",
    file: "templates-inheritance-and-context-design.json",
    icon: "🎨",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "project-settings-and-environment-configuration",
    name: "プロジェクト設定と環境構成",
    file: "project-settings-and-environment-configuration.json",
    icon: "⚙️",
    color: "from-emerald-600 to-teal-700",
  },
] as const;
