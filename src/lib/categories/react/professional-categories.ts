// React Professionalのカテゴリデータ（S3のjpファイル名に合わせる）
export const categoriesData = [
  {
    id: "component-architecture-and-composition-patterns",
    name: "コンポーネントアーキテクチャとコンポジションパターン",
    file: "component-architecture-and-composition-patterns.json",
    icon: "🔷",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "data-fetching-and-server-state-patterns",
    name: "データフェッチとサーバーステートパターン",
    file: "data-fetching-and-server-state-patterns.json",
    icon: "🔀",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: "forms-validation-and-controlled-components",
    name: "フォーム・バリデーションと制御コンポーネント",
    file: "forms-validation-and-controlled-components.json",
    icon: "🛡️",
    color: "from-slate-600 to-blue-700",
  },
  {
    id: "state-management-strategy-and-context-design",
    name: "状態管理戦略とコンテキスト設計",
    file: "state-management-strategy-and-context-design.json",
    icon: "📦",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "testing-and-debugging-react-apps",
    name: "Reactアプリのテストとデバッグ",
    file: "testing-and-debugging-react-apps.json",
    icon: "✨",
    color: "from-slate-600 to-blue-600",
  },
] as const;
