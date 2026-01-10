// 面接練習 Associateコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "interview-basics",
    // 画面表示用の名前
    name: "面接対策 - 基礎知識",
    // aws-s3にアップロードしたファイル名
    file: "interview-basics.json",
    icon: "🔤",
    color: "from-red-500 to-pink-600",
  },
  {
    id: "self-introduction",
    name: "面接対策 - 自己紹介と志望動機",
    file: "self-introduction.json",
    icon: "📦",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "technical-questions",
    name: "面接対策 - 技術的な質問",
    file: "technical-questions.json",
    icon: "🔗",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "behavioral-questions",
    name: "面接対策 - 行動質問（STAR法）",
    file: "behavioral-questions.json",
    icon: "🛠️",
    color: "from-red-600 to-pink-700",
  },
  {
    id: "portfolio-presentation",
    name: "面接対策 - ポートフォリオ紹介",
    file: "portfolio-presentation.json",
    icon: "⚡",
    color: "from-pink-600 to-rose-700",
  },
] as const;
