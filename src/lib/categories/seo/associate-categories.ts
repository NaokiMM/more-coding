// SEO Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "html-structure-markup-optimization",
    // 画面表示用の名前
    name: "HTML構造・マークアップ最適化",
    // aws-s3にアップロードしたファイル名
    file: "html-structure-markup-optimization.json",
    icon: "🔤",
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: "meta-information-crawl-control",
    name: "メタ情報・クロール制御",
    file: "meta-information-crawl-control.json",
    icon: "📦",
    color: "from-purple-500 to-indigo-600",
  },
  {
    id: "usability-ux-mobile-speed",
    name: "ユーザビリティ・UX（モバイル・速度）",
    file: "usability-ux-mobile-speed.json",
    icon: "🔗",
    color: "from-indigo-600 to-purple-700",
  },
  {
    id: "link-site-structure-optimization",
    name: "リンク・サイト構造最適化",
    file: "link-site-structure-optimization.json",
    icon: "🛠️",
    color: "from-purple-600 to-violet-700",
  },
  {
    id: "accessibility-auxiliary-information",
    name: "アクセシビリティ・補助情報",
    file: "accessibility-auxiliary-information.json",
    icon: "⚡",
    color: "from-violet-500 to-purple-600",
  },
] as const;
