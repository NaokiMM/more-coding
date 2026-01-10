// SEO Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "seo-basics",
    // 画面表示用の名前
    name: "SEO - 基礎知識",
    // aws-s3にアップロードしたファイル名
    file: "seo-basics.json",
    icon: "🔤",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "on-page-seo",
    name: "SEO - オンページSEO",
    file: "on-page-seo.json",
    icon: "📦",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "meta-tags",
    name: "SEO - メタタグと構造化データ",
    file: "meta-tags.json",
    icon: "🔗",
    color: "from-indigo-600 to-purple-700",
  },
  {
    id: "content-optimization",
    name: "SEO - コンテンツ最適化",
    file: "content-optimization.json",
    icon: "🛠️",
    color: "from-purple-600 to-violet-700",
  },
  {
    id: "keyword-research",
    name: "SEO - キーワードリサーチ",
    file: "keyword-research.json",
    icon: "⚡",
    color: "from-violet-500 to-purple-600",
  },
] as const;
