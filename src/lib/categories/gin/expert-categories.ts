// Gin Expertのカテゴリデータ（s3-assets/gin/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "restful-api-design",
    name: "RESTful API設計",
    file: "restful-api-design.json",
    icon: "📐",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "jwt-authentication",
    name: "JWT認証",
    file: "jwt-authentication.json",
    icon: "🔑",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "performance-optimization",
    name: "パフォーマンス最適化",
    file: "performance-optimization.json",
    icon: "⚡",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "security-best-practices",
    name: "セキュリティベストプラクティス",
    file: "security-best-practices.json",
    icon: "🔒",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "deployment-cicd",
    name: "デプロイメントとCI/CD",
    file: "deployment-cicd.json",
    icon: "🚀",
    color: "from-green-500 to-emerald-600",
  },
] as const;
