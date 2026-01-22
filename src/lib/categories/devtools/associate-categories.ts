// DevTools Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "console-log-usage",
    // 画面表示用の名前
    name: "Console 操作・ログ活用",
    // aws-s3にアップロードしたファイル名
    file: "console-log-usage.json",
    icon: "🔤",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "elements-css-debugging",
    name: "Elements・CSS デバッグ",
    file: "elements-css-debugging.json",
    icon: "📦",
    color: "from-cyan-500 to-teal-600",
  },
  {
    id: "sources-javascript-debugging",
    name: "Sources・JavaScript デバッグ",
    file: "sources-javascript-debugging.json",
    icon: "🛠️",
    color: "from-cyan-600 to-teal-700",
  },
  {
    id: "network-communication-analysis",
    name: "Network・通信解析",
    file: "network-communication-analysis.json",
    icon: "⚡",
    color: "from-teal-600 to-emerald-600",
  },
  {
    id: "performance-application-quality-evaluation",
    name: "Performance・Application・品質評価",
    file: "performance-application-quality-evaluation.json",
    icon: "⚡",
    color: "from-teal-600 to-emerald-600",
  },
] as const;
