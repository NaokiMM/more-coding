// Vue.js Professionalのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "composition-api",
    // 画面表示用の名前
    name: "Composition API",
    // aws-s3にアップロードしたファイル名
    file: "composition-api.json",
    icon: "🔷",
    color: "from-green-600 to-emerald-700",
  },
  {
    id: "reactivity-system",
    name: "リアクティビティシステム",
    file: "reactivity-system.json",
    icon: "🔀",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "vue-router",
    name: "Vue Routerとルーティング",
    file: "vue-router.json",
    icon: "🛡️",
    color: "from-teal-600 to-cyan-700",
  },
  {
    id: "pinia-state",
    name: "Piniaによる状態管理",
    file: "pinia-state.json",
    icon: "📦",
    color: "from-cyan-600 to-blue-700",
  },
  {
    id: "custom-directives",
    name: "カスタムディレクティブとプラグイン",
    file: "custom-directives.json",
    icon: "✨",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "ssr-nuxt",
    name: "SSRとNuxt.js",
    file: "ssr-nuxt.json",
    icon: "🏗️",
    color: "from-green-700 to-emerald-800",
  },
] as const;
