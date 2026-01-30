// JavaScript Expertのカテゴリデータ（s3-assets/javascript/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "event-loop-microtasks-and-scheduling",
    name: "イベントループ・マイクロタスクとスケジューリング",
    file: "event-loop-microtasks-and-scheduling.json",
    icon: "🔄",
    color: "from-yellow-600 to-orange-700",
  },
  {
    id: "javascript-engine-execution-model",
    name: "JavaScriptエンジンと実行モデル",
    file: "javascript-engine-execution-model.json",
    icon: "⚙️",
    color: "from-orange-600 to-red-700",
  },
  {
    id: "prototype-chain-and-inheritance-internals",
    name: "プロトタイプチェーンと継承の内部",
    file: "prototype-chain-and-inheritance-internals.json",
    icon: "🔗",
    color: "from-red-600 to-pink-700",
  },
  {
    id: "memory-management-and-garbage-collection",
    name: "メモリ管理とガベージコレクション",
    file: "memory-management-and-garbage-collection.json",
    icon: "📦",
    color: "from-pink-600 to-rose-700",
  },
  {
    id: "spec-driven-language-edge-cases",
    name: "仕様駆動と言語のエッジケース",
    file: "spec-driven-language-edge-cases.json",
    icon: "📜",
    color: "from-rose-600 to-red-700",
  },
] as const;
