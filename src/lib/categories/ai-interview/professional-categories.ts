// AI面接 Professional のカテゴリ（id は URL セグメント、file は S3 上の JSON ファイル名）
export const categoriesData = [
  {
    id: "business-understanding",
    name: "ビジネス理解",
    file: "business_understanding.json",
    icon: "📊",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "organization-design",
    name: "組織設計",
    file: "organization_design.json",
    icon: "🏛️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "product-thinking",
    name: "プロダクト思考",
    file: "product_thinking.json",
    icon: "💡",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "risk-management",
    name: "リスク管理",
    file: "risk_management.json",
    icon: "⚠️",
    color: "from-slate-600 to-blue-600",
  },
  {
    id: "technical-strategy",
    name: "技術戦略",
    file: "technical_strategy.json",
    icon: "🎯",
    color: "from-slate-600 to-blue-600",
  },
] as const;
