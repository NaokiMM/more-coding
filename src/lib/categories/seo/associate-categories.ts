// SEO Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "html-structure-markup-optimization",
    // 画面表示用の名前
    name: "HTML構造・マークアップ最適化",
    // aws-s3にアップロードしたファイル名
    file: "html-structure-markup-optimization.json",
    icon: "🔤",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "meta-information-crawl-control",
    name: "メタ情報・クロール制御",
    file: "meta-information-crawl-control.json",
    icon: "📦",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "usability-ux-mobile-speed",
    name: "ユーザビリティ・UX（モバイル・速度）",
    file: "usability-ux-mobile-speed.json",
    icon: "🔗",
    color: "from-slate-600 to-blue-700",
  },
  {
    id: "link-site-structure-optimization",
    name: "リンク・サイト構造最適化",
    file: "link-site-structure-optimization.json",
    icon: "🛠️",
    color: "from-slate-600 to-blue-700",
  },
  {
    id: "accessibility-auxiliary-information",
    name: "アクセシビリティ・補助情報",
    file: "accessibility-auxiliary-information.json",
    icon: "⚡",
    color: "from-slate-600 to-blue-600",
  },
] as const;
