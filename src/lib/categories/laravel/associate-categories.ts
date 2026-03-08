// Laravel Associateのカテゴリデータ（s3-assets/laravel/associate/jp/*.json に対応）
export const categoriesData = [
  {
    id: "basics_setup",
    name: "基本設定",
    file: "basics_setup.json",
    icon: "⚙️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "routing_controller",
    name: "ルーティングとコントローラー",
    file: "routing_controller.json",
    icon: "🛤️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "database_crud",
    name: "データベースとCRUD",
    file: "database_crud.json",
    icon: "💾",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "blade_views",
    name: "Bladeテンプレートとビュー",
    file: "blade_views.json",
    icon: "🎨",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "forms_validation",
    name: "フォームとバリデーション",
    file: "forms_validation.json",
    icon: "📝",
    color: "from-green-500 to-emerald-600",
  },
] as const;
