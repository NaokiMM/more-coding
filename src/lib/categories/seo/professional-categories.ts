// SEO Professionalのカテゴリデータ（S3のjpファイル名に合わせる）
export const categoriesData = [
  {
    id: "content-strategy-and-topical-authority",
    name: "コンテンツ戦略とトピックオーソリティ",
    file: "content-strategy-and-topical-authority.json",
    icon: "🔷",
    color: "from-teal-600 to-emerald-700",
  },
  {
    id: "keyword-research-and-search-intent-design",
    name: "キーワードリサーチと検索意図設計",
    file: "keyword-research-and-search-intent-design.json",
    icon: "🔀",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "measurement-analytics-and-seo-kpi",
    name: "計測・アナリティクスとSEO KPI",
    file: "measurement-analytics-and-seo-kpi.json",
    icon: "🛡️",
    color: "from-teal-700 to-cyan-700",
  },
  {
    id: "performance-core-web-vitals-optimization",
    name: "パフォーマンス・Core Web Vitals最適化",
    file: "performance-core-web-vitals-optimization.json",
    icon: "📦",
    color: "from-cyan-600 to-teal-800",
  },
  {
    id: "technical-seo-site-health-and-indexing",
    name: "テクニカルSEO・サイトヘルスとインデックス",
    file: "technical-seo-site-health-and-indexing.json",
    icon: "✨",
    color: "from-teal-700 to-emerald-800",
  },
] as const;
