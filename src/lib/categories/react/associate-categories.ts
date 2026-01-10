// React Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "jsx-basics",
    // 画面表示用の名前
    name: "React - JSXの基礎",
    // aws-s3にアップロードしたファイル名
    file: "jsx-basics.json",
    icon: "🔤",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "components-props",
    name: "React - コンポーネントとProps",
    file: "components-props.json",
    icon: "📦",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "state-management",
    name: "React - State管理",
    file: "state-management.json",
    icon: "🔗",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "event-handling",
    name: "React - イベントハンドリング",
    file: "event-handling.json",
    icon: "🛠️",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: "conditional-rendering",
    name: "React - 条件付きレンダリング",
    file: "conditional-rendering.json",
    icon: "⚡",
    color: "from-indigo-500 to-blue-600",
  },
] as const;
