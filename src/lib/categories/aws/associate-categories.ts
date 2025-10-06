// AWS Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "cloud-fundamentals",
    // 画面表示用の名前
    name: "AWS - クラウドの基礎",
    // aws-s3にアップロードしたファイル名
    file: "cloud-fundamentals.json",
    // 画面表示用のアイコン
    icon: "☁️",
    // 画面表示用の色
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "compute-services",
    name: "AWS - コンピューティングサービス",
    file: "compute-services.json",
    icon: "💻",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "storage-services",
    name: "AWS - ストレージサービス",
    file: "storage-services.json",
    icon: "💾",
    color: "from-green-500 to-green-600",
  },
  {
    id: "networking-services",
    name: "AWS - ネットワークサービス",
    file: "networking-services.json",
    icon: "🌐",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "security-iam",
    name: "AWS - セキュリティとIAM",
    file: "security-iam.json",
    icon: "🔒",
    color: "from-red-500 to-red-600",
  },
] as const;
