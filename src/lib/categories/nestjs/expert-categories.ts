// NestJS Expertのカテゴリデータ（s3-assets/nestjs/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "dependency-injection-container-internals",
    name: "依存性注入コンテナの内部",
    file: "dependency-injection-container-internals.json",
    icon: "📦",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "execution-context-and-request-scope-analysis",
    name: "実行コンテキストとリクエストスコープ解析",
    file: "execution-context-and-request-scope-analysis.json",
    icon: "🔍",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "framework-internals-and-metadata-reflection",
    name: "フレームワーク内部とメタデータリフレクション",
    file: "framework-internals-and-metadata-reflection.json",
    icon: "⚙️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "microservices-transport-and-communication-models",
    name: "マイクロサービス・トランスポートと通信モデル",
    file: "microservices-transport-and-communication-models.json",
    icon: "🚀",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "performance-tuning-and-scalability-patterns",
    name: "パフォーマンスチューニングとスケーラビリティパターン",
    file: "performance-tuning-and-scalability-patterns.json",
    icon: "📈",
    color: "from-blue-500 to-blue-700",
  },
] as const;
