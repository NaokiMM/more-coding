// Express.js Expertのカテゴリデータ（s3-assets/expressjs/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "middleware-execution-model-and-async-traps",
    name: "ミドルウェア実行モデルと非同期の落とし穴",
    file: "middleware-execution-model-and-async-traps.json",
    icon: "🛤️",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: "event-loop-and-request-lifecycle-internals",
    name: "イベントループとリクエストライフサイクル内部",
    file: "event-loop-and-request-lifecycle-internals.json",
    icon: "🔄",
    color: "from-slate-500 to-gray-600",
  },
  {
    id: "error-boundaries-and-failure-isolation",
    name: "エラー境界と障害の分離",
    file: "error-boundaries-and-failure-isolation.json",
    icon: "🛡️",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: "high-performance-routing-and-scaling-strategies",
    name: "高パフォーマンスルーティングとスケーリング戦略",
    file: "high-performance-routing-and-scaling-strategies.json",
    icon: "⚡",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "security-hardening-and-attack-mitigation",
    name: "セキュリティ強化と攻撃対策",
    file: "security-hardening-and-attack-mitigation.json",
    icon: "🔒",
    color: "from-green-500 to-emerald-600",
  },
] as const;
