// SEO Expertのカテゴリデータ（S3のjpファイル名に合わせる）
export const categoriesData = [
  {
    id: "crawl-budget-and-large-site-optimization",
    name: "クロールバジェットと大規模サイト最適化",
    file: "crawl-budget-and-large-site-optimization.json",
    icon: "🔷",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "international-seo-and-advanced-site-architecture",
    name: "国際SEOと高度なサイトアーキテクチャ",
    file: "international-seo-and-advanced-site-architecture.json",
    icon: "🔀",
    color: "from-cyan-600 to-teal-700",
  },
  {
    id: "log-analysis-and-search-bot-behavior",
    name: "ログ分析と検索ボットの挙動",
    file: "log-analysis-and-search-bot-behavior.json",
    icon: "🛡️",
    color: "from-teal-700 to-emerald-700",
  },
  {
    id: "penalty-recovery-and-risk-management",
    name: "ペナルティ・リカバリーとリスク管理",
    file: "penalty-recovery-and-risk-management.json",
    icon: "📦",
    color: "from-emerald-600 to-teal-800",
  },
  {
    id: "search-engine-algorithm-and-ranking-signals",
    name: "検索エンジンアルゴリズムとランキングシグナル",
    file: "search-engine-algorithm-and-ranking-signals.json",
    icon: "✨",
    color: "from-teal-700 to-cyan-800",
  },
] as const;
