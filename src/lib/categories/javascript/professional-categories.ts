// JavaScript Professionalのカテゴリデータ（s3-assets/javascript/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "execution-context-and-closure-practical",
    name: "実行コンテキストとクロージャ（実践）",
    file: "execution-context-and-closure-practical.json",
    icon: "🔷",
    color: "from-yellow-600 to-orange-700",
  },
  {
    id: "async-patterns-and-promise-design",
    name: "非同期パターンとPromise設計",
    file: "async-patterns-and-promise-design.json",
    icon: "🔀",
    color: "from-orange-600 to-red-700",
  },
  {
    id: "module-system-and-build-boundaries",
    name: "モジュールシステムとビルド境界",
    file: "module-system-and-build-boundaries.json",
    icon: "🛡️",
    color: "from-red-600 to-pink-700",
  },
  {
    id: "error-handling-and-runtime-safety",
    name: "エラーハンドリングとランタイム安全性",
    file: "error-handling-and-runtime-safety.json",
    icon: "📦",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "immutability-and-data-structure-design",
    name: "イミュータビリティとデータ構造設計",
    file: "immutability-and-data-structure-design.json",
    icon: "✨",
    color: "from-rose-600 to-red-700",
  },
] as const;
