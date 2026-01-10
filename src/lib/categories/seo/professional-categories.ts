// SEO Professionalコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "technical-seo",
    // 画面表示用の名前
    name: "テクニカルSEO",
    // aws-s3にアップロードしたファイル名
    file: "technical-seo.json",
    icon: "🔷",
    color: "from-indigo-600 to-purple-700",
  },
  {
    id: "off-page-seo",
    name: "オフページSEOとリンク構築",
    file: "off-page-seo.json",
    icon: "🔀",
    color: "from-purple-600 to-violet-700",
  },
  {
    id: "schema-markup",
    name: "スキーママークアップと構造化データ",
    file: "schema-markup.json",
    icon: "🛡️",
    color: "from-violet-600 to-purple-800",
  },
  {
    id: "analytics-measurement",
    name: "SEO分析と計測",
    file: "analytics-measurement.json",
    icon: "📦",
    color: "from-purple-700 to-indigo-800",
  },
  {
    id: "local-seo",
    name: "ローカルSEO",
    file: "local-seo.json",
    icon: "✨",
    color: "from-indigo-700 to-purple-800",
  },
  {
    id: "advanced-strategies",
    name: "高度なSEO戦略",
    file: "advanced-strategies.json",
    icon: "🏗️",
    color: "from-purple-800 to-violet-900",
  },
] as const;
