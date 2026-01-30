// DevTools Professionalのカテゴリデータ（s3-assets/devtools/professional/jp/*.json に対応）
export const categoriesData = [
  {
    id: "console-structured-logging-and-filtering",
    name: "Console 構造化ログとフィルタリング",
    file: "console-structured-logging-and-filtering.json",
    icon: "🔤",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "elements-responsive-and-computed-style-analysis",
    name: "Elements レスポンシブと計算済みスタイル分析",
    file: "elements-responsive-and-computed-style-analysis.json",
    icon: "📦",
    color: "from-cyan-600 to-teal-700",
  },
  {
    id: "sources-async-debugging-and-call-stack-analysis",
    name: "Sources 非同期デバッグとコールスタック分析",
    file: "sources-async-debugging-and-call-stack-analysis.json",
    icon: "🛠️",
    color: "from-teal-700 to-cyan-800",
  },
  {
    id: "network-request-lifecycle-and-error-diagnosis",
    name: "Network リクエストライフサイクルとエラー診断",
    file: "network-request-lifecycle-and-error-diagnosis.json",
    icon: "⚡",
    color: "from-cyan-700 to-teal-800",
  },
  {
    id: "performance-memory-and-runtime-investigation",
    name: "Performance メモリとランタイム調査",
    file: "performance-memory-and-runtime-investigation.json",
    icon: "📈",
    color: "from-teal-700 to-emerald-800",
  },
] as const;
