// JavaScript Professionalのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "basics",
    // 画面表示用の名前
    name: "基礎（Node/モジュール/型/React/DOM/テスト）",
    // aws-s3にアップロードしたファイル名
    file: "basics.json",
    icon: "🔷",
    color: "from-yellow-600 to-orange-700",
  },
  {
    id: "builtins",
    name: "組み込み（グローバル値/関数/プリミティブ）",
    file: "builtins.json",
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
    id: "errors",
    name: "エラー処理（Error系）",
    file: "errors.json",
    icon: "📦",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "collections",
    name: "コレクション/バイナリ",
    file: "collections.json",
    icon: "✨",
    color: "from-rose-600 to-red-700",
  },
  {
    id: "advanced",
    name: "高度（Promise/Iterator/Proxy/Intl など）",
    file: "advanced.json",
    icon: "🏗️",
    color: "from-yellow-700 to-orange-800",
  },
] as const;
