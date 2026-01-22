// React Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "overview-thinking-overall",
    // 画面表示用の名前
    name: "概要・考え方・全体像",
    // aws-s3にアップロードしたファイル名
    file: "overview-thinking-overall.json",
    icon: "🔤",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "components-jsx-rendering",
    name: "コンポーネント・JSX・描画",
    file: "components-jsx-rendering.json",
    icon: "📦",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "props-data-flow",
    name: "Props・データフロー",
    file: "props-data-flow.json",
    icon: "🔗",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "state-hooks-side-effects",
    name: "State・Hooks・副作用",
    file: "state-hooks-side-effects.json",
    icon: "🛠️",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "event-form-optimization-tools",
    name: "イベント・フォーム・最適化・周辺ツール",
    file: "event-form-optimization-tools.json",
    icon: "⚡",
    color: "from-indigo-500 to-blue-600",
  },
] as const;
