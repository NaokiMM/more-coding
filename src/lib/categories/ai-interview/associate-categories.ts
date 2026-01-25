// AI面接 Associateのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "overview-preparation",
    // 画面表示用の名前
    name: "概要・準備方法",
    // aws-s3にアップロードしたファイル名
    file: "overview-preparation.json",
    icon: "📋",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "self-introduction-motivation",
    name: "自己紹介・志望動機",
    file: "self-introduction-motivation.json",
    icon: "👋",
    color: "from-pink-500 to-purple-600",
  },
  {
    id: "strengths-weaknesses-self-pr",
    name: "長所・短所・自己PR",
    file: "strengths-weaknesses-self-pr.json",
    icon: "💪",
    color: "from-purple-600 to-pink-700",
  },
  {
    id: "answer-techniques",
    name: "質問への回答テクニック",
    file: "answer-techniques.json",
    icon: "💡",
    color: "from-pink-600 to-purple-700",
  },
  {
    id: "expression-posture-speaking",
    name: "表情・姿勢・話し方",
    file: "expression-posture-speaking.json",
    icon: "🎭",
    color: "from-indigo-500 to-purple-600",
  },
] as const;
