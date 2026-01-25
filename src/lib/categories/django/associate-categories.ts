// Django Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "overview-introduction",
    // 画面表示用の名前
    name: "Djangoとは・概要・全体像",
    // aws-s3にアップロードしたファイル名
    file: "overview-introduction.json",
    icon: "📋",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "project-application",
    name: "プロジェクトとアプリケーション",
    file: "project-application.json",
    icon: "📦",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "model-database",
    name: "モデルとデータベース",
    file: "model-database.json",
    icon: "🗄️",
    color: "from-green-600 to-teal-600",
  },
  {
    id: "view-url-routing",
    name: "ビューとURLルーティング",
    file: "view-url-routing.json",
    icon: "🔗",
    color: "from-teal-500 to-green-600",
  },
  {
    id: "template-static-files",
    name: "テンプレートと静的ファイル",
    file: "template-static-files.json",
    icon: "🎨",
    color: "from-green-600 to-emerald-700",
  },
] as const;
