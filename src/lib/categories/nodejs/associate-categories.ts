// Node.js Associateのカテゴリデータ（s3-assets/nodejs/associate/jp/*.json に対応）
export const categoriesData = [
  {
    id: "basics_setup",
    name: "基本設定",
    file: "basics_setup.json",
    icon: "⚙️",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "modules_require",
    name: "モジュールと require",
    file: "modules_require.json",
    icon: "📦",
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "async_event_loop",
    name: "非同期とイベントループ",
    file: "async_event_loop.json",
    icon: "🔄",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "file_system",
    name: "ファイルシステム",
    file: "file_system.json",
    icon: "📁",
    color: "from-cyan-500 to-sky-600",
  },
  {
    id: "http_server",
    name: "HTTP サーバー",
    file: "http_server.json",
    icon: "🌐",
    color: "from-sky-500 to-blue-600",
  },
] as const;
