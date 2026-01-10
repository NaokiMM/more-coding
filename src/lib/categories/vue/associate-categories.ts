// Vue.js Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "template-syntax",
    // 画面表示用の名前
    name: "Vue.js - テンプレート構文",
    // aws-s3にアップロードしたファイル名
    file: "template-syntax.json",
    icon: "🔤",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "directives-binding",
    name: "Vue.js - ディレクティブとデータバインディング",
    file: "directives-binding.json",
    icon: "📦",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "components-basics",
    name: "Vue.js - コンポーネントの基本",
    file: "components-basics.json",
    icon: "🔗",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "event-handling",
    name: "Vue.js - イベントハンドリング",
    file: "event-handling.json",
    icon: "🛠️",
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: "computed-watchers",
    name: "Vue.js - 算出プロパティとウォッチャー",
    file: "computed-watchers.json",
    icon: "⚡",
    color: "from-teal-500 to-green-600",
  },
] as const;
