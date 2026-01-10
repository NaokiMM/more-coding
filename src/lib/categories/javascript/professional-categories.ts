// JavaScript Professionalコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "advanced-functions-closures",
    // 画面表示用の名前
    name: "高度な関数とクロージャ",
    // aws-s3にアップロードしたファイル名
    file: "advanced-functions-closures.json",
    icon: "🔷",
    color: "from-yellow-600 to-orange-700",
  },
  {
    id: "prototype-inheritance",
    name: "プロトタイプと継承",
    file: "prototype-inheritance.json",
    icon: "🔀",
    color: "from-orange-600 to-red-700",
  },
  {
    id: "modules-bundling",
    name: "モジュールシステムとバンドリング",
    file: "modules-bundling.json",
    icon: "🛡️",
    color: "from-red-600 to-pink-700",
  },
  {
    id: "design-patterns",
    name: "デザインパターン",
    file: "design-patterns.json",
    icon: "📦",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "performance-optimization",
    name: "パフォーマンス最適化",
    file: "performance-optimization.json",
    icon: "✨",
    color: "from-rose-600 to-red-700",
  },
  {
    id: "memory-management",
    name: "メモリ管理とガベージコレクション",
    file: "memory-management.json",
    icon: "🏗️",
    color: "from-yellow-700 to-orange-800",
  },
] as const;
