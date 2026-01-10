// TypeScript Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "basic-types",
    // 画面表示用の名前
    name: "TypeScript - 基礎表現",
    // aws-s3にアップロードしたファイル名
    file: "basic-types.json",
    icon: "🔤",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "generics-type-operations",
    name: "TypeScript - ジェネリクス & 型演算",
    file: "generics-type-operations.json",
    icon: "📦",
    color: "from-green-500 to-green-600",
  },
  {
    id: "type-safe-implementation",
    name: "TypeScript - 型安全の実装",
    file: "type-safe-implementation.json",
    icon: "🔗",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "data-operation-with-standard-api",
    name: "TypeScript - 標準APIでのデータ操作",
    file: "data-operation-with-standard-api.json",
    icon: "🛠️",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "practical-patterns",
    name: "TypeScript - 実務パターン",
    file: "practical-patterns.json",
    icon: "⚡",
    color: "from-pink-500 to-pink-600",
  },
] as const;