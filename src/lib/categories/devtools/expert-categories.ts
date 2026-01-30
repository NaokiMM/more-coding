// DevTools Expertのカテゴリデータ（s3-assets/devtools/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "console-internals-and-custom-logging",
    name: "Console 内部とカスタムログ",
    file: "console-internals-and-custom-logging.json",
    icon: "🔤",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "elements-rendering-and-css-engine-analysis",
    name: "Elements レンダリングとCSSエンジン分析",
    file: "elements-rendering-and-css-engine-analysis.json",
    icon: "📦",
    color: "from-cyan-600 to-teal-700",
  },
  {
    id: "sources-javascript-engine-and-execution-analysis",
    name: "Sources JavaScriptエンジンと実行分析",
    file: "sources-javascript-engine-and-execution-analysis.json",
    icon: "🛠️",
    color: "from-teal-700 to-cyan-800",
  },
  {
    id: "network-protocols-and-performance-deep-dive",
    name: "Network プロトコルとパフォーマンス深掘り",
    file: "network-protocols-and-performance-deep-dive.json",
    icon: "⚡",
    color: "from-cyan-700 to-teal-800",
  },
  {
    id: "performance-profiling-and-bottleneck-identification",
    name: "Performance プロファイリングとボトルネック特定",
    file: "performance-profiling-and-bottleneck-identification.json",
    icon: "📈",
    color: "from-teal-700 to-emerald-800",
  },
] as const;
