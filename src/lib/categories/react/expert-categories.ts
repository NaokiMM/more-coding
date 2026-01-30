// React Expertのカテゴリデータ（S3のjpファイル名に合わせる）
export const categoriesData = [
  {
    id: "concurrent-rendering-and-suspense-internals",
    name: "コンカレントレンダリングとSuspenseの内部",
    file: "concurrent-rendering-and-suspense-internals.json",
    icon: "🔷",
    color: "from-purple-600 to-pink-700",
  },
  {
    id: "performance-profiling-and-memoization-strategy",
    name: "パフォーマンスプロファイリングとメモ化戦略",
    file: "performance-profiling-and-memoization-strategy.json",
    icon: "🔀",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "react-internals-fiber-and-scheduling",
    name: "React内部・Fiberとスケジューリング",
    file: "react-internals-fiber-and-scheduling.json",
    icon: "🛡️",
    color: "from-rose-600 to-red-700",
  },
  {
    id: "react-rendering-model-and-reconciliation",
    name: "Reactのレンダリングモデルとリコンシリエーション",
    file: "react-rendering-model-and-reconciliation.json",
    icon: "📦",
    color: "from-red-600 to-orange-700",
  },
  {
    id: "state-machine-and-advanced-architecture-patterns",
    name: "状態機械と高度なアーキテクチャパターン",
    file: "state-machine-and-advanced-architecture-patterns.json",
    icon: "✨",
    color: "from-orange-600 to-amber-700",
  },
] as const;
