// TypeScript Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "basic-types",
    // 画面表示用の名前
    name: "基礎表現",
    // aws-s3にアップロードしたファイル名
    file: "basic-types.json",
    // 画面表示用のアイコン
    icon: "🔤",
    // 画面表示用の色
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "generics-type-operations",
    name: "ジェネリクス & 型演算",
    file: "generics-type-operations.json",
    icon: "📦",
    color: "from-green-500 to-green-600",
  },
  {
    id: "type-safe-implementation",
    name: "型安全の実装",
    file: "type-safe-implementation.json",
    icon: "🔗",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "data-operation-with-standard-api",
    name: "標準APIでのデータ操作",
    file: "data-operation-with-standard-api.json",
    icon: "🛠️",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "practical-patterns",
    name: "実務パターン",
    file: "practical-patterns.json",
    icon: "⚡",
    color: "from-slate-600 to-blue-600",
  },
] as const;
