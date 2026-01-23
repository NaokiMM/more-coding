// NestJS Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "modules-controllers",
    // 画面表示用の名前
    name: "モジュール・コントローラー",
    // aws-s3にアップロードしたファイル名
    file: "modules-controllers.json",
    icon: "📦",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "providers-services",
    name: "プロバイダー・サービス",
    file: "providers-services.json",
    icon: "⚙️",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "dependency-injection",
    name: "依存性注入",
    file: "dependency-injection.json",
    icon: "🔌",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "middleware-guards",
    name: "ミドルウェア・ガード",
    file: "middleware-guards.json",
    icon: "🛡️",
    color: "from-red-500 to-orange-600",
  },
  {
    id: "database-integration",
    name: "データベース連携",
    file: "database-integration.json",
    icon: "🗄️",
    color: "from-orange-500 to-amber-600",
  },
] as const;
