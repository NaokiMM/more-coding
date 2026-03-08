// Vue.js Professionalのカテゴリデータ（S3のjpファイル名に合わせる）
export const categoriesData = [
  {
    id: "async-data-fetching-and-lifecycle-control",
    name: "非同期データフェッチとライフサイクル制御",
    file: "async-data-fetching-and-lifecycle-control.json",
    icon: "🔷",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "component-architecture-and-design-patterns",
    name: "コンポーネントアーキテクチャとデザインパターン",
    file: "component-architecture-and-design-patterns.json",
    icon: "🔀",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "form-handling-validation-and-vmodel-design",
    name: "フォーム処理・バリデーションとv-model設計",
    file: "form-handling-validation-and-vmodel-design.json",
    icon: "🛡️",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "state-management-strategy-pinia-and-composition",
    name: "状態管理戦略・PiniaとComposition",
    file: "state-management-strategy-pinia-and-composition.json",
    icon: "📦",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "testing-debugging-and-devtools-usage",
    name: "テスト・デバッグとDevTools活用",
    file: "testing-debugging-and-devtools-usage.json",
    icon: "✨",
    color: "from-blue-600 to-blue-800",
  },
] as const;
