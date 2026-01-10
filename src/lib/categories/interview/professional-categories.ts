// 面接練習 Professionalコースのカテゴリデータ
export const categoriesData = [
  {
    // 画面表示用のID且つaws-s3にアップロードしたファイル名
    id: "coding-interview",
    // 画面表示用の名前
    name: "コーディング面接",
    // aws-s3にアップロードしたファイル名
    file: "coding-interview.json",
    icon: "🔷",
    color: "from-red-600 to-pink-700",
  },
  {
    id: "system-design",
    name: "システム設計面接",
    file: "system-design.json",
    icon: "🔀",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "algorithm-data-structures",
    name: "アルゴリズムとデータ構造",
    file: "algorithm-data-structures.json",
    icon: "🛡️",
    color: "from-rose-600 to-red-700",
  },
  {
    id: "architecture-discussion",
    name: "アーキテクチャディスカッション",
    file: "architecture-discussion.json",
    icon: "📦",
    color: "from-red-700 to-pink-800",
  },
  {
    id: "negotiation-skills",
    name: "交渉スキルと給与交渉",
    file: "negotiation-skills.json",
    icon: "✨",
    color: "from-pink-700 to-rose-800",
  },
  {
    id: "leadership-questions",
    name: "リーダーシップとチーム管理",
    file: "leadership-questions.json",
    icon: "🏗️",
    color: "from-rose-700 to-red-800",
  },
] as const;
