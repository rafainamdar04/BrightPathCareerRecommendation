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

export type ImprovementRecommendation = {
  area: string
  priority: 'High' | 'Medium' | 'Low'
  action: string
  resources: string[]
  timeline: string
}

export type ConfidenceInfo = {
  predicted_career: string
  confidence_score: number
  confidence_level: 'Very High' | 'High' | 'Moderate' | 'Low'
  probability_distribution?: Array<{
    career: string
    probability: number
  }>
}

export type XAIResponse = {
  career?: string
  summary?: string
  visualization?: string // path starting with /static or full URL
  visualization_waterfall?: string
  visualization_beeswarm?: string
  // Either feature_contributions or shap_values may be present
  feature_contributions?: Record<string, number>
  shap_values?: Record<string, number>
  top_factors?: XAITopFactor[]
  lime_explanation?: string[]
  confidence?: ConfidenceInfo
  improvement_recommendations?: ImprovementRecommendation[]
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

export type CounterfactualChange = {
  feature: string
  current_value: string
  impact_difference: number
  direction: 'increase' | 'change'
  suggestion: string
}

export type TransitionPlan = {
  transition_summary: string
  difficulty: 'Easy' | 'Moderate' | 'Challenging'
  estimated_timeline: string
  short_term: string[]
  medium_term: string[]
  long_term: string[]
  key_skills: string[]
  success_tips: string[]
}

export type CounterfactualResponse = {
  current_role: string
  target_role: string
  changes_needed: CounterfactualChange[]
  feasibility: 'High' | 'Moderate' | 'Challenging'
  transition_plan?: TransitionPlan
}
