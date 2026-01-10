// Next.js Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "getting-started",
    // 画面表示用の名前
    name: "Next.js - はじめに",
    // aws-s3にアップロードしたファイル名
    file: "getting-started.json",
    icon: "🔤",
    color: "from-gray-700 to-gray-900",
  },
  {
    id: "pages-routing",
    name: "Next.js - ページとルーティング",
    file: "pages-routing.json",
    icon: "📦",
    color: "from-gray-800 to-black",
  },
  {
    id: "data-fetching",
    name: "Next.js - データフェッチング",
    file: "data-fetching.json",
    icon: "🔗",
    color: "from-slate-700 to-gray-800",
  },
  {
    id: "api-routes",
    name: "Next.js - APIルート",
    file: "api-routes.json",
    icon: "🛠️",
    color: "from-gray-900 to-slate-900",
  },
  {
    id: "layouts-components",
    name: "Next.js - レイアウトとコンポーネント",
    file: "layouts-components.json",
    icon: "⚡",
    color: "from-slate-800 to-gray-900",
  },
] as const;
