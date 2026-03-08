// JavaScript Associateのカテゴリデータ
export const categoriesData = [
    {
        id: "basics_rendering",
        name: "基礎・レンダリング",
        file: "basics_rendering.json",
        icon: "🛠️",
        color: "from-slate-600 to-blue-600",
    },
    {
      // 画面表示用のID且つaws-s3にアップロードしたファイル名
      id: "data_fetching_state",
      // 画面表示用の名前
      name: "データ取得・状態管理",
      // aws-s3にアップロードしたファイル名
      file: "data_fetching_state.json",
      icon: "🔤",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "build_operations_seo",
      name: "ビルド・運用(SEO/エラー/配信)",
      file: "build_operations_seo.json",
      icon: "📦",
      color: "from-slate-600 to-blue-600",
    },
    {
      id: "routing_layout",
      name: "ルーティング・レイアウト",
      file: "routing_layout.json",
      icon: "🔗",
      color: "from-slate-600 to-blue-600",
    },
    {
      id: "config_modules_plugins",
      name: "設定・拡張（モジュール/プラグイン）",
      file: "config_modules_plugins.json",
      icon: "⚡",
      color: "from-slate-600 to-blue-600",
    },
  ] as const;
  