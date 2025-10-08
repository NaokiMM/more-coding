// AWS Professionalコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "advanced-architecture",
    // 画面表示用の名前
    name: "AWS - 高度なアーキテクチャ設計",
    // aws-s3にアップロードしたファイル名
    file: "advanced-architecture.json",
    // 画面表示用のアイコン
    icon: "🏗️",
    // 画面表示用の色
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: "cost-optimization",
    name: "AWS - コスト最適化",
    file: "cost-optimization.json",
    icon: "💰",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    id: "performance-optimization",
    name: "AWS - パフォーマンス最適化",
    file: "performance-optimization.json",
    icon: "⚡",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    id: "advanced-networking",
    name: "AWS - 高度なネットワーク",
    file: "advanced-networking.json",
    icon: "🔗",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "advanced-security",
    name: "AWS - 高度なセキュリティ",
    file: "advanced-security.json",
    icon: "🛡️",
    color: "from-pink-500 to-pink-600",
  },
] as const;
