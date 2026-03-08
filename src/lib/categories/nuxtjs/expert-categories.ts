// Nuxt.js Expertのカテゴリデータ（s3-assets/nuxtjs/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "nitro-server-internals-and-deployment",
    name: "Nitro サーバー内部とデプロイ",
    file: "nitro-server-internals-and-deployment.json",
    icon: "⚡",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "vue-rendering-and-hydration-internals",
    name: "Vue レンダリングとハイドレーション内部",
    file: "vue-rendering-and-hydration-internals.json",
    icon: "🖼️",
    color: "from-cyan-500 to-sky-600",
  },
  {
    id: "performance-and-optimization-patterns",
    name: "パフォーマンスと最適化パターン",
    file: "performance-and-optimization-patterns.json",
    icon: "📈",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "advanced-composables-and-state-management",
    name: "高度な Composables と状態管理",
    file: "advanced-composables-and-state-management.json",
    icon: "🧩",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "security-and-authentication-patterns",
    name: "セキュリティと認証パターン",
    file: "security-and-authentication-patterns.json",
    icon: "🛡️",
    color: "from-slate-600 to-blue-600",
  },
] as const;
