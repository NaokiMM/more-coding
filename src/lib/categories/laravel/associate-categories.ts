// Laravel Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "routing-controllers",
    // 画面表示用の名前
    name: "ルーティング・コントローラー",
    // aws-s3にアップロードしたファイル名
    file: "routing-controllers.json",
    icon: "🛣️",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "eloquent-orm",
    name: "Eloquent ORM",
    file: "eloquent-orm.json",
    icon: "🗄️",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "blade-templates",
    name: "Bladeテンプレート",
    file: "blade-templates.json",
    icon: "📄",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "middleware-authentication",
    name: "ミドルウェア・認証",
    file: "middleware-authentication.json",
    icon: "🔐",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "validation-forms",
    name: "バリデーション・フォーム",
    file: "validation-forms.json",
    icon: "✅",
    color: "from-orange-500 to-amber-600",
  },
] as const;
