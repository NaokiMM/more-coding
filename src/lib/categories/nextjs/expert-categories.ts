// DevTools Professionalのカテゴリデータ
export const categoriesData = [
    {
      // 画面表示用のID且つaws-s3にアップロードしたファイル名
      id: "advanced-debugging",
      // 画面表示用の名前
      name: "高度なデバッグ技術",
      // aws-s3にアップロードしたファイル名
      file: "advanced-debugging.json",
      icon: "🔷",
      color: "from-teal-600 to-cyan-700",
    },
    {
      id: "memory-profiling",
      name: "メモリプロファイリング",
      file: "memory-profiling.json",
      icon: "🔀",
      color: "from-cyan-600 to-teal-700",
    },
    {
      id: "custom-devtools",
      name: "カスタムDevToolsの開発",
      file: "custom-devtools.json",
      icon: "🛡️",
      color: "from-teal-700 to-cyan-800",
    },
    {
      id: "automation-testing",
      name: "自動化とテストツール",
      file: "automation-testing.json",
      icon: "📦",
      color: "from-cyan-700 to-teal-800",
    },
    {
      id: "security-analysis",
      name: "セキュリティ分析ツール",
      file: "security-analysis.json",
      icon: "✨",
      color: "from-teal-700 to-emerald-800",
    },
    {
      id: "production-monitoring",
      name: "本番環境監視ツール",
      file: "production-monitoring.json",
      icon: "🏗️",
      color: "from-cyan-800 to-teal-900",
    },
  ] as const;
  