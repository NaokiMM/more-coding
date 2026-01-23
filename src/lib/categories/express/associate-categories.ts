// Express Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "routing-basics",
    // 画面表示用の名前
    name: "ルーティング基礎",
    // aws-s3にアップロードしたファイル名
    file: "routing-basics.json",
    icon: "🛣️",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "middleware",
    name: "ミドルウェア",
    file: "middleware.json",
    icon: "🔧",
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "request-response",
    name: "リクエスト・レスポンス",
    file: "request-response.json",
    icon: "📡",
    color: "from-gray-500 to-zinc-600",
  },
  {
    id: "template-engines",
    name: "テンプレートエンジン",
    file: "template-engines.json",
    icon: "📄",
    color: "from-zinc-500 to-neutral-600",
  },
  {
    id: "error-handling",
    name: "エラーハンドリング",
    file: "error-handling.json",
    icon: "⚠️",
    color: "from-neutral-500 to-stone-600",
  },
] as const;
