// JavaScript Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "basic-expression",
    // 画面表示用の名前
    name: "基礎表現",
    // aws-s3にアップロードしたファイル名
    file: "basic-expression.json",
    icon: "🔤",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "variables-scope-functions",
    name: "変数・スコープ・関数",
    file: "variables-scope-functions.json",
    icon: "📦",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "objects-arrays-prototype",
    name: "オブジェクト・配列・プロトタイプ",
    file: "objects-arrays-prototype.json",
    icon: "🔗",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "async-event-loop",
    name: "非同期・イベントループ",
    file: "async-event-loop.json",
    icon: "🛠️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "latest-features",
    name: "最新の機能",
    file: "latest-features.json",
    icon: "⚡",
    color: "from-slate-600 to-blue-600",
  },
] as const;
