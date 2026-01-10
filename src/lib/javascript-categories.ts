// JavaScript Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "basic-syntax",
    // 画面表示用の名前
    name: "JavaScript - 基礎構文",
    // aws-s3にアップロードしたファイル名
    file: "basic-syntax.json",
    icon: "🔤",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "functions-scope",
    name: "JavaScript - 関数 & スコープ",
    file: "functions-scope.json",
    icon: "📦",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "objects-arrays",
    name: "JavaScript - オブジェクト & 配列",
    file: "objects-arrays.json",
    icon: "🔗",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "async-programming",
    name: "JavaScript - 非同期プログラミング",
    file: "async-programming.json",
    icon: "🛠️",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "es6-features",
    name: "JavaScript - ES6+機能",
    file: "es6-features.json",
    icon: "⚡",
    color: "from-rose-500 to-red-600",
  },
] as const;