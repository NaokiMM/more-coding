// Vue.js Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "basic-design-philosophy",
    // 画面表示用の名前
    name: "Vue - 基礎・設計思想",
    // aws-s3にアップロードしたファイル名
    file: "basic-design-philosophy.json",
    icon: "🔤",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "template-rendering-ui-structure",
    name: "Vue - テンプレート・描画・UI構造",
    file: "template-rendering-ui-structure.json",
    icon: "📦",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "props-events-component-interaction",
    name: "Vue - Props・Events・コンポーネント連携",
    file: "props-events-component-interaction.json",
    icon: "🔗",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "reactive-state-composition-api",
    name: "Vue - リアクティブ状態・Composition API",
    file: "reactive-state-composition-api.json",
    icon: "🛠️",
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: "routing-state-management-tools",
    name: "Vue - ルーティング・状態管理・周辺ツール",
    file: "routing-state-management-tools.json",
    icon: "⚡",
    color: "from-teal-500 to-green-600",
  },
] as const;
