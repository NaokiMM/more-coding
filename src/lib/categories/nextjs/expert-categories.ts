// Next.js Expertのカテゴリデータ（s3-assets/nextjs/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "app-router-advanced",
    name: "App Routerの高度な機能",
    file: "app-router-advanced.json",
    icon: "🔄",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "server-actions-and-forms",
    name: "サーバーアクションとフォーム",
    file: "server-actions-and-forms.json",
    icon: "📝",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "streaming-and-suspense",
    name: "ストリーミングとSuspense",
    file: "streaming-and-suspense.json",
    icon: "⚡",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "performance-and-caching",
    name: "パフォーマンスとキャッシュ",
    file: "performance-and-caching.json",
    icon: "🏗️",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "deployment-and-runtime",
    name: "デプロイとランタイム",
    file: "deployment-and-runtime.json",
    icon: "🚀",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "monitoring-and-observability",
    name: "モニタリングと観測",
    file: "monitoring-and-observability.json",
    icon: "📊",
    color: "from-violet-500 to-purple-600",
  },
] as const;
