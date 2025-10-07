// AWS Expertコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "enterprise-architecture",
    // 画面表示用の名前
    name: "AWS - エンタープライズアーキテクチャ",
    // aws-s3にアップロードしたファイル名
    file: "enterprise-architecture.json",
    // 画面表示用のアイコン
    icon: "🏢",
    // 画面表示用の色
    color: "from-violet-500 to-violet-600",
  },
  {
    id: "multi-account-strategy",
    name: "AWS - マルチアカウント戦略",
    file: "multi-account-strategy.json",
    icon: "🔀",
    color: "from-fuchsia-500 to-fuchsia-600",
  },
  {
    id: "advanced-monitoring",
    name: "AWS - 高度な監視と運用",
    file: "advanced-monitoring.json",
    icon: "📊",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "disaster-recovery",
    name: "AWS - 災害復旧とビジネス継続性",
    file: "disaster-recovery.json",
    icon: "🔄",
    color: "from-rose-500 to-rose-600",
  },
  {
    id: "advanced-automation",
    name: "AWS - 高度な自動化",
    file: "advanced-automation.json",
    icon: "🤖",
    color: "from-sky-500 to-sky-600",
  },
] as const;
