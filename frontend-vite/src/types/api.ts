// Typed shapes for backend responses

export type TopPrediction = {
  role: string
  confidence_score: number
}

export type Top3CareerOutput = {
  top_predictions: TopPrediction[]
}

export type RoadmapResponse = {
  skills: string[]
  certifications: string[]
  projects: string[]
}

export type XAITopFactor = {
  feature: string
  impact: 'positive' | 'negative'
  contribution: number
  insight?: string
}

export type XAIResponse = {
  summary?: string
  visualization?: string // path starting with /static or full URL
  // Either feature_contributions or shap_values may be present
  feature_contributions?: Record<string, number>
  shap_values?: Record<string, number>
  top_factors?: XAITopFactor[]
  lime_explanation?: string[]
}

export type EvolutionStage = {
  stage?: number | string
  role: string
  timeframe: string
  confidence: number // 0..1
}

export type EvolutionResponse = {
  future_roles: EvolutionStage[]
}
