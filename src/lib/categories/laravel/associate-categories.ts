// Laravel Associateのカテゴリデータ（s3-assets/laravel/associate/jp/*.json に対応）
export const categoriesData = [
  {
    id: "basics_setup",
    name: "基本設定",
    file: "basics_setup.json",
    icon: "⚙️",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "routing_controller",
    name: "ルーティングとコントローラー",
    file: "routing_controller.json",
    icon: "🛤️",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "database_crud",
    name: "データベースとCRUD",
    file: "database_crud.json",
    icon: "💾",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "blade_views",
    name: "Bladeテンプレートとビュー",
    file: "blade_views.json",
    icon: "🎨",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "forms_validation",
    name: "フォームとバリデーション",
    file: "forms_validation.json",
    icon: "📝",
    color: "from-green-500 to-emerald-600",
  },
] as const;
