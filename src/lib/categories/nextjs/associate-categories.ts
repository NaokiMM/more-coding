// JavaScript Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "api-middleware",
    // 画面表示用の名前
    name: "API・ミドルウェア",
    // aws-s3にアップロードしたファイル名
    file: "api-middleware.json",
    icon: "🔤",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: "components-rsc",
    name: "コンポーネント（RSC/Client）",
    file: "components-rsc.json",
    icon: "📦",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "routing-navigation",
    name: "ルーティング・ナビゲーション",
    file: "routing-navigation.json",
    icon: "🔗",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "rendering-data",
    name: "レンダリング・データ取得",
    file: "rendering-data.json",
    icon: "🛠️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "assets-config-performance",
    name: "画像・設定・パフォーマンス",
    file: "assets-config-performance.json",
    icon: "⚡",
    color: "from-slate-600 to-blue-600",
  },
] as const;
