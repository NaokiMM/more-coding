// Gin Associateのカテゴリデータ（s3-assets/gin/associate/jp/*.json に対応）
export const categoriesData = [
  {
    id: "basics_overview",
    name: "Ginとは・概要・全体像",
    file: "basics_overview.json",
    icon: "🚀",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "routing",
    name: "ルーティング",
    file: "routing.json",
    icon: "🛤️",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "middleware",
    name: "ミドルウェア",
    file: "middleware.json",
    icon: "⚙️",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "request_response",
    name: "リクエスト・レスポンス",
    file: "request_response.json",
    icon: "📨",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "basic_api",
    name: "基本的なAPI構築",
    file: "basic_api.json",
    icon: "📦",
    color: "from-green-500 to-emerald-600",
  },
] as const;
