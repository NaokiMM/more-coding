// React Professionalのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "hooks-advanced",
    // 画面表示用の名前
    name: "高度なHooks",
    // aws-s3にアップロードしたファイル名
    file: "hooks-advanced.json",
    icon: "🔷",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "context-api",
    name: "Context APIと状態管理",
    file: "context-api.json",
    icon: "🔀",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "performance-optimization",
    name: "パフォーマンス最適化",
    file: "performance-optimization.json",
    icon: "🛡️",
    color: "from-indigo-600 to-purple-700",
  },
  {
    id: "testing-patterns",
    name: "テストとパターン",
    file: "testing-patterns.json",
    icon: "📦",
    color: "from-purple-600 to-pink-700",
  },
  {
    id: "routing-navigation",
    name: "ルーティングとナビゲーション",
    file: "routing-navigation.json",
    icon: "✨",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "server-components",
    name: "サーバーコンポーネントとSSR",
    file: "server-components.json",
    icon: "🏗️",
    color: "from-cyan-700 to-blue-800",
  },
] as const;
