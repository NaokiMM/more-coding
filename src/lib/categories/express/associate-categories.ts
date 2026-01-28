// Express.js Associateのカテゴリデータ（s3-assets/expressjs/associate/jp/*.json に対応）
export const categoriesData = [
  {
    id: "basics_setup",
    name: "基本設定",
    file: "basics_setup.json",
    icon: "⚙️",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "routing_middleware",
    name: "ルーティング・ミドルウェア",
    file: "routing_middleware.json",
    icon: "🛤️",
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "request_response",
    name: "リクエスト・レスポンス",
    file: "request_response.json",
    icon: "📨",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "error_handling_config",
    name: "エラーハンドリング・設定",
    file: "error_handling_config.json",
    icon: "🛡️",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "crud_api",
    name: "Express.js - CRUD API",
    file: "crud_api.json",
    icon: "📦",
    color: "from-green-500 to-emerald-600",
  },
] as const;
