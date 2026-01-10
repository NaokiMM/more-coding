// DevTool Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "devtool-basics",
    // 画面表示用の名前
    name: "DevTool - 基礎知識",
    // aws-s3にアップロードしたファイル名
    file: "devtool-basics.json",
    icon: "🔤",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "browser-devtools",
    name: "DevTool - ブラウザ開発者ツール",
    file: "browser-devtools.json",
    icon: "📦",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "debugging-techniques",
    name: "DevTool - デバッグ技法",
    file: "debugging-techniques.json",
    icon: "🔗",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "performance-profiling",
    name: "DevTool - パフォーマンス計測",
    file: "performance-profiling.json",
    icon: "🛠️",
    color: "from-cyan-600 to-teal-700",
  },
  {
    id: "network-analysis",
    name: "DevTool - ネットワーク分析",
    file: "network-analysis.json",
    icon: "⚡",
    color: "from-teal-600 to-emerald-600",
  },
] as const;
