// AI面接 Associate のカテゴリ（id は URL セグメント、file は S3 上の JSON ファイル名）
export const categoriesData = [
  {
    id: "coding-deep-understanding",
    name: "コーディングに関する全般知識",
    file: "coding_deep_understanding.json",
    icon: "📋",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "cloud-architecture-and-operations",
    name: "クラウド（設計・運用）",
    file: "cloud_architecture_and_operations.json",
    icon: "🌐",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "upstream-processes",
    name: "上流工程（要件〜設計）",
    file: "upstream_processes.json",
    icon: "📝",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "security-measures",
    name: "セキュリティ（対策）",
    file: "security_measures.json",
    icon: "🔒",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "team-management",
    name: "マネジメント（チーム単位）",
    file: "team_management.json",
    icon: "👥",
    color: "from-slate-700 to-blue-600",
  },
] as const;
