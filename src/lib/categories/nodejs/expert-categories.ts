// Node.js Expertのカテゴリデータ（s3-assets/nodejs/expert/jp/*.json に対応）
export const categoriesData = [
  {
    id: "event-loop-and-async-internals",
    name: "イベントループと非同期内部",
    file: "event-loop-and-async-internals.json",
    icon: "⚡",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "worker-threads-and-cluster",
    name: "Worker Threads と Cluster",
    file: "worker-threads-and-cluster.json",
    icon: "🧵",
    color: "from-cyan-500 to-sky-600",
  },
  {
    id: "v8-and-memory-management",
    name: "V8 とメモリ管理",
    file: "v8-and-memory-management.json",
    icon: "💾",
    color: "from-sky-500 to-blue-600",
  },
  {
    id: "streams-and-buffers-internals",
    name: "ストリームとバッファの内部",
    file: "streams-and-buffers-internals.json",
    icon: "🌊",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "performance-and-security-hardening",
    name: "パフォーマンスとセキュリティ強化",
    file: "performance-and-security-hardening.json",
    icon: "🛡️",
    color: "from-indigo-500 to-violet-600",
  },
] as const;
