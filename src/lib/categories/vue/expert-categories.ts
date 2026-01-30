// Vue.js Expertのカテゴリデータ（S3のjpファイル名に合わせる）
export const categoriesData = [
  {
    id: "compiler-sfc-transform-and-build-pipeline",
    name: "コンパイラ・SFC変換とビルドパイプライン",
    file: "compiler-sfc-transform-and-build-pipeline.json",
    icon: "🔷",
    color: "from-purple-600 to-pink-700",
  },
  {
    id: "large-scale-architecture-and-micro-frontend-patterns",
    name: "大規模アーキテクチャとマイクロフロントエンドパターン",
    file: "large-scale-architecture-and-micro-frontend-patterns.json",
    icon: "🔀",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "performance-optimization-and-render-control",
    name: "パフォーマンス最適化とレンダー制御",
    file: "performance-optimization-and-render-control.json",
    icon: "🛡️",
    color: "from-rose-600 to-red-700",
  },
  {
    id: "reactivity-system-internals-and-tracking",
    name: "リアクティビティシステムの内部とトラッキング",
    file: "reactivity-system-internals-and-tracking.json",
    icon: "📦",
    color: "from-red-600 to-orange-700",
  },
  {
    id: "virtual-dom-rendering-and-diffing-strategy",
    name: "仮想DOMレンダリングと差分戦略",
    file: "virtual-dom-rendering-and-diffing-strategy.json",
    icon: "✨",
    color: "from-orange-600 to-amber-700",
  },
] as const;
