// Gin Professionalのカテゴリデータ（s3-assets/gin/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "advanced-routing",
    name: "高度なルーティング",
    file: "advanced-routing.json",
    icon: "🛤️",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "custom-middleware",
    name: "カスタムミドルウェア",
    file: "custom-middleware.json",
    icon: "⚙️",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "validation-binding",
    name: "バリデーションとバインディング",
    file: "validation-binding.json",
    icon: "📋",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "authentication",
    name: "認証・認可",
    file: "authentication.json",
    icon: "🔐",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "error-handling-logging",
    name: "エラーハンドリングとロギング",
    file: "error-handling-logging.json",
    icon: "🛡️",
    color: "from-green-500 to-emerald-600",
  },
] as const;
