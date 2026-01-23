// Node.js Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "modules-package-manager",
    // 画面表示用の名前
    name: "モジュール・パッケージマネージャー",
    // aws-s3にアップロードしたファイル名
    file: "modules-package-manager.json",
    icon: "📦",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "async-event-loop",
    name: "非同期処理・イベントループ",
    file: "async-event-loop.json",
    icon: "⚡",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "file-system",
    name: "ファイルシステム操作",
    file: "file-system.json",
    icon: "📁",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "http-server",
    name: "HTTPサーバー",
    file: "http-server.json",
    icon: "🌐",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "error-handling",
    name: "エラーハンドリング",
    file: "error-handling.json",
    icon: "⚠️",
    color: "from-blue-500 to-indigo-600",
  },
] as const;
