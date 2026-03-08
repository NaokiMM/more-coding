// NestJS Associateのカテゴリデータ（s3-assets/nestjs/associate/jp/*.json に対応）
export const categoriesData = [
  {
    id: "basics_setup",
    name: "基本設定",
    file: "basics_setup.json",
    icon: "⚙️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "modules_controllers_providers",
    name: "モジュール・コントローラー・プロバイダー",
    file: "modules_controllers_providers.json",
    icon: "📦",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "routing_dto",
    name: "ルーティングとDTO",
    file: "routing_dto.json",
    icon: "🛤️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "services_di",
    name: "サービスと依存性注入",
    file: "services_di.json",
    icon: "💉",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "validation_exception_config",
    name: "バリデーション・例外・設定",
    file: "validation_exception_config.json",
    icon: "🛡️",
    color: "from-blue-500 to-blue-700",
  },
] as const;
