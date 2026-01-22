// Next.js Professionalのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "ssr-ssg-isr",
    // 画面表示用の名前
    name: "SSR/SSG/ISR",
    // aws-s3にアップロードしたファイル名
    file: "ssr-ssg-isr.json",
    icon: "🔷",
    color: "from-gray-700 to-black",
  },
  {
    id: "image-optimization",
    name: "画像最適化とメディア",
    file: "image-optimization.json",
    icon: "🔀",
    color: "from-slate-700 to-gray-800",
  },
  {
    id: "middleware",
    name: "ミドルウェアと認証",
    file: "middleware.json",
    icon: "🛡️",
    color: "from-gray-800 to-slate-900",
  },
  {
    id: "env-config",
    name: "環境変数と設定",
    file: "env-config.json",
    icon: "📦",
    color: "from-slate-800 to-gray-900",
  },
  {
    id: "deployment",
    name: "デプロイメントとCI/CD",
    file: "deployment.json",
    icon: "✨",
    color: "from-gray-900 to-black",
  },
  {
    id: "performance-optimization",
    name: "パフォーマンス最適化",
    file: "performance-optimization.json",
    icon: "🏗️",
    color: "from-slate-900 to-black",
  },
] as const;
