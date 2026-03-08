// TypeScript Professionalのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "generics",
    // 画面表示用の名前
    name: "ジェネリクス",
    // aws-s3にアップロードしたファイル名
    file: "generics.json",
    icon: "🔷",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "union-intersection",
    name: "ユニオン型とインターセクション型",
    file: "union-intersection.json",
    icon: "🔀",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "type-guards",
    name: "型ガードと型アサーション",
    file: "type-guards.json",
    icon: "🛡️",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "modules-namespaces",
    name: "モジュールと名前空間",
    file: "modules-namespaces.json",
    icon: "📦",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "decorators",
    name: "デコレータ",
    file: "decorators.json",
    icon: "✨",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "classes-inheritance",
    name: "クラスと継承",
    file: "classes-inheritance.json",
    icon: "🏗️",
    color: "from-blue-600 to-blue-700",
  },
] as const;
