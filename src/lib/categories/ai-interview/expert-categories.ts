// AI面接 Expert のカテゴリ（id は URL セグメント、file は S3 上の JSON ファイル名）
export const categoriesData = [
  {
    id: "architecture-design-microservices-vs-monolith-tradeoffs",
    name: "アーキテクチャ設計（マイクロサービスとモノリス）",
    file: "architecture_design_microservices_vs_monolith_tradeoffs.json",
    icon: "🏗️",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "security-strategy-threat-modeling-and-risk-prioritization",
    name: "セキュリティ戦略（脅威モデリング・リスク優先）",
    file: "security_strategy_threat_modeling_and_risk_prioritization.json",
    icon: "🔐",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "technical-decision-making-technology-selection-and-org-fit",
    name: "技術意思決定（選定・組織適合）",
    file: "technical_decision_making_technology_selection_and_org_fit.json",
    icon: "⚖️",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "scalability-design-high-load-handling-and-bottleneck-analysis",
    name: "スケーラビリティ設計（高負荷・ボトルネック）",
    file: "scalability_design_high_load_handling_and_bottleneck_analysis.json",
    icon: "📈",
    color: "from-slate-700 to-blue-600",
  },
  {
    id: "team-and-organization-improvement-process-optimization-and-productivity",
    name: "チーム・組織改善（プロセス・生産性）",
    file: "team_and_organization_improvement_process_optimization_and_productivity.json",
    icon: "👥",
    color: "from-slate-700 to-blue-600",
  },
] as const;
