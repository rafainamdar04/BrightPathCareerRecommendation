import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)
import { EnhancedRoadmapDisplay } from '../components/EnhancedRoadmapDisplay'
import { SkillGapAnalysis } from '../components/SkillGapAnalysis'
import { fetchWithTimeout } from '../utils/http'
import { apiUrl } from '../utils/api'

// Model Architecture Display Component
function ModelArchitectureDisplay() {
  const [architecture, setArchitecture] = useState<any>(null)
  const [visualizationPath, setVisualizationPath] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const fetchArchitecture = async () => {
      try {
        // Fetch architecture details
        const archRes = await fetch('http://localhost:8000/model_architecture')
        if (archRes.ok) {
          const archData = await archRes.json()
          setArchitecture(archData)
        }

        // Fetch visualization
        const vizRes = await fetch('http://localhost:8000/model_architecture/visualization')
        if (vizRes.ok) {
          const vizData = await vizRes.json()
          setVisualizationPath(vizData.visualization_path)
        }
      } catch (err) {
        console.error('Error fetching model architecture:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchArchitecture()
  }, [])

  if (loading) {
    return (
      <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
        <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Model Architecture</div>
        <div className="text-xs text-slate-500">Loading model details...</div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="w-14 h-14 bg-gradient-to-br from-[#9b5de5] to-[#7b3fb8] rounded-xl flex items-center justify-center shadow-lg"
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Neural Network Architecture</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">How our AI generates your recommendations</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9b5de5] to-[#7b3fb8] text-white text-sm font-semibold hover:shadow-lg transition-all duration-300"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Visualization Image */}
      {visualizationPath && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <img
            src={apiUrl(visualizationPath)}
            alt="Neural Network Architecture"
            className="w-full h-auto rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-lg"
          />
        </motion.div>
      )}

      {/* How It Works Explanation */}
      <div className="bg-gradient-to-br from-[#9b5de5]/5 to-[#7b3fb8]/5 dark:from-[#9b5de5]/10 dark:to-[#7b3fb8]/10 rounded-xl p-6 mb-6">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-[#9b5de5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How It Works
        </h4>
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p className="leading-relaxed">
            <strong className="text-[#9b5de5]">Input Layer:</strong> Your profile data (academic scores, skills, interests, work preferences) enters through {architecture?.input_features || 'multiple'} input neurons, each representing a specific attribute.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#9b5de5]">Hidden Layers:</strong> The network processes this information through {architecture?.layers?.filter((l: any) => l.type === 'hidden').length || 3} hidden layers using ReLU activation functions. Each layer identifies patterns and relationships in your data, learning which combinations of skills and attributes align with different career paths.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#9b5de5]">Output Layer:</strong> The final layer produces confidence scores for {architecture?.output_classes || 'multiple'} different career roles, showing how well you match each career based on learned patterns from thousands of successful professionals.
          </p>
          <p className="leading-relaxed">
            <strong className="text-[#9b5de5]">Explainability:</strong> SHAP (SHapley Additive exPlanations) traces how each of your inputs influenced the final recommendation, making the AI's decision-making transparent and trustworthy.
          </p>
        </div>
      </div>

      {/* Details Panel */}
      <AnimatePresence>
        {showDetails && architecture && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-slate-200 dark:border-slate-800 pt-6"
          >
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Technical Details</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Model Type</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">{architecture.model_type}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Framework</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">{architecture.framework}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Optimizer</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">{architecture.optimizer}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Total Parameters</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">{architecture.total_parameters?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Input Features</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">{architecture.input_features}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Output Classes</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">{architecture.output_classes} careers</span>
                </div>
              </div>
            </div>
            
            {/* Layer breakdown */}
            <div className="mt-6">
              <h5 className="font-semibold text-slate-900 dark:text-white mb-3">Layer Structure</h5>
              <div className="space-y-2">
                {architecture.layers?.map((layer: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      layer.type === 'input' ? 'bg-blue-500' :
                      layer.type === 'hidden' ? 'bg-purple-500' :
                      'bg-green-500'
                    }`} />
                    <span className="text-slate-900 dark:text-white font-medium flex-1">
                      {layer.name}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 text-sm">
                      {layer.neurons} neurons
                      {layer.activation && ` • ${layer.activation}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Lightweight clones of displays used in CareerRecommendation
function CareerEvolutionDisplay({ data, role }: { data: any, role: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800"
    >
      <div className="flex items-center gap-4 mb-8 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Career Evolution Path</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Trajectory for {role}</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-slate-300 dark:via-slate-600 to-transparent" />
        <div className="space-y-6">
          {data?.future_roles?.map((stage: any, i: number) => (
            <div key={i} className="relative pl-16">
              <div className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-primary border-4 border-white dark:border-slate-900 shadow">
                <span className="text-white font-bold">{stage.stage || i + 1}</span>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="text-lg font-bold text-slate-900 dark:text-white">{stage.role}</h5>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{stage.timeframe}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Confidence</p>
                    <p className="text-xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">{(stage.confidence * 100).toFixed(0)}%</p>
                  </div>
                </div>
                <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-600 rounded-full" style={{ width: `${stage.confidence * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function XAIDisplay({ data, role, formData, availableRoles }: { data: any, role: string, formData?: any, availableRoles?: string[] }) {
  const [showChart, setShowChart] = useState<boolean>(false)
  const [sortMode, setSortMode] = useState<'abs' | 'raw'>('abs')
  const [polarity, setPolarity] = useState<'all' | 'pos' | 'neg'>('all')
  const [topK, setTopK] = useState<number>(10)
  const [showCounterfactual, setShowCounterfactual] = useState<boolean>(false)
  const [counterfactualTarget, setCounterfactualTarget] = useState<string>('')
  const [counterfactualData, setCounterfactualData] = useState<any>(null)
  const [loadingCounterfactual, setLoadingCounterfactual] = useState<boolean>(false)

  const fetchCounterfactual = async (targetRole: string) => {
    if (!formData || !targetRole) return
    setLoadingCounterfactual(true)
    try {
      const res = await fetchWithTimeout(
        apiUrl(`/xai_counterfactual/${encodeURIComponent(targetRole)}?max_changes=3`),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          timeoutMs: 15000
        }
      )
      const result = await res.json()
      setCounterfactualData(result)
    } catch (err: any) {
      console.error('Counterfactual fetch error:', err)
      setCounterfactualData({ error: err.message || 'Failed to fetch counterfactual' })
    } finally {
      setLoadingCounterfactual(false)
    }
  }

  const featureMap: Record<string, number> = data?.feature_contributions || data?.shap_values || {}
  const pairs = Object.entries(featureMap)
    .filter(([_, v]) => (polarity === 'all') || (polarity === 'pos' ? v >= 0 : v < 0))
    .sort((a, b) => sortMode === 'abs' ? Math.abs(b[1]) - Math.abs(a[1]) : b[1] - a[1])
    .slice(0, topK)

  const labels = pairs.map(([k]) => k)
  const values = pairs.map(([_, v]) => v)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Feature Contribution (SHAP)',
        data: values,
        backgroundColor: values.map(v => v >= 0 ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'),
        borderColor: values.map(v => v >= 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)'),
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  }
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 11 } } },
      y: { grid: { color: 'rgba(148,163,184,0.15)' }, ticks: { color: '#94a3b8', font: { size: 11 } } },
    },
  } as const

  const downloadReport = () => {
    const content = `Career: ${role}\nGenerated: ${new Date().toLocaleString()}\n\nSUMMARY:\n${data.summary || 'N/A'}\n\nTOP FACTORS:\n${(data.top_factors || []).map((f: any, i: number) => `${i+1}. ${f.feature} (${f.impact}): ${Number(f.contribution).toFixed(3)}\n   ${f.insight || ''}`).join('\n') || 'N/A'}\n\nDETAILED EXPLANATIONS:\n${(data.lime_explanation || []).map((e: string, i: number) => `${i+1}. ${e}`).join('\n') || 'N/A'}`.trim()
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `XAI_Report_${role.replace(/\s+/g,'_')}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasExtraImages = data?.visualization_beeswarm || data?.visualization_waterfall

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">XAI Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Explainable AI for {role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChart(v => !v)}
            className="px-3 py-2 rounded-lg text-sm border border-primary/30 text-primary hover:bg-primary/5"
          >
            {showChart ? 'Show Image' : 'Interactive Chart'}
          </button>
          <button
            onClick={downloadReport}
            className="px-3 py-2 rounded-lg text-sm btn-primary"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* DL Badge and explainer */}
      <div className="mb-6 flex items-center gap-3">
        <div className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          Powered by Deep Learning
        </div>
        <span className="text-xs text-slate-600 dark:text-slate-400">Feature importance is computed with SHAP over the model's outputs to explain why a role was recommended.</span>
      </div>

      {/* Summary */}
      {data?.summary && (
        <div className="mb-6 p-5 bg-gradient-to-r from-primary/10 to-primary-600/10 rounded-xl border-l-4 border-primary">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Extra images tabs if provided */}
      {hasExtraImages && (
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          {data?.visualization_beeswarm && (
            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Global Importance (Beeswarm)</div>
              <img src={apiUrl(data.visualization_beeswarm)} className="w-full h-auto rounded" alt="SHAP Beeswarm" />
            </div>
          )}
          {data?.visualization_waterfall && (
            <div className="bg-slate-50 dark:bg-slate-800/70 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Per-Decision Waterfall</div>
              <img src={apiUrl(data.visualization_waterfall)} className="w-full h-auto rounded" alt="SHAP Waterfall" />
            </div>
          )}
        </div>
      )}

      {/* Image vs Interactive Chart */}
      {!showChart && data?.visualization && (
        <div className="mb-6 bg-slate-50 dark:bg-slate-800/70 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Feature Importance Visualization</h4>
          </div>
          <img
            src={apiUrl(data.visualization)}
            alt="SHAP Visualization - Feature Importance"
            className="w-full h-auto rounded"
          />
        </div>
      )}

      {(showChart || !data?.visualization) && labels.length > 0 && (
        <div className="mb-6 bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Interactive Feature Importance</h4>
            <div className="flex items-center gap-2 text-xs">
              <label className="flex items-center gap-1">
                Sort:
                <select className="input-select" value={sortMode} onChange={(e) => setSortMode(e.target.value as any)}>
                  <option value="abs">By |impact|</option>
                  <option value="raw">By raw value</option>
                </select>
              </label>
              <label className="flex items-center gap-1">
                Filter:
                <select className="input-select" value={polarity} onChange={(e) => setPolarity(e.target.value as any)}>
                  <option value="all">All</option>
                  <option value="pos">Positive</option>
                  <option value="neg">Negative</option>
                </select>
              </label>
              <label className="flex items-center gap-1">
                Top K:
                <input type="number" min={1} max={50} value={topK} onChange={(e) => setTopK(Math.min(50, Math.max(1, Number(e.target.value)||10)))} className="w-16 input-base py-1 px-2" />
              </label>
            </div>
          </div>
          <div style={{ height: '360px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Top Factors */}
      {data?.top_factors && data.top_factors.length > 0 && (
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          {data.top_factors.map((f: any, i: number) => (
            <div key={i} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{f.feature}</span>
                <span className={`text-xs font-bold ${f.impact === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}>{f.impact}</span>
              </div>
              <div className={`text-xs font-bold inline-block px-2 py-0.5 rounded ${f.impact === 'positive' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'}`}>
                {f.impact === 'positive' ? '↑' : '↓'} {Number(f.contribution).toFixed(3)}
              </div>
              {f.insight && <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{f.insight}</p>}
            </div>
          ))}
        </div>
      )}

      {/* NEW: Prediction Confidence */}
      {data?.confidence && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Prediction Confidence</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Confidence Score</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {(data.confidence.confidence_score * 100).toFixed(1)}%
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Confidence Level</p>
              <p className={`text-lg font-bold ${
                data.confidence.confidence_level === 'Very High' ? 'text-emerald-600' :
                data.confidence.confidence_level === 'High' ? 'text-blue-600' :
                data.confidence.confidence_level === 'Moderate' ? 'text-amber-600' : 'text-red-600'
              }`}>
                {data.confidence.confidence_level}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Predicted Career</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                {data.confidence.predicted_career}
              </p>
            </div>
          </div>
          {data.confidence.probability_distribution && data.confidence.probability_distribution.length > 1 && (
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Probability Distribution:</p>
              <div className="space-y-2">
                {data.confidence.probability_distribution.slice(0, 5).map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 dark:text-slate-400 w-32 truncate">{item.career}</span>
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${item.probability * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-12 text-right">
                      {(item.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* NEW: Improvement Recommendations */}
      {data?.improvement_recommendations && data.improvement_recommendations.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Personalized Improvement Plan</h4>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Based on your profile, here are the top areas to improve for {role}:
          </p>
          <div className="space-y-4">
            {data.improvement_recommendations.map((rec: any, i: number) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{rec.feature}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    rec.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                    rec.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                  Current impact: <span className="font-semibold text-red-600">{rec.current_impact}</span>
                </p>
                {rec.suggestions && rec.suggestions.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Action Steps:</p>
                    <ul className="space-y-1">
                      {rec.suggestions.map((sug: string, j: number) => (
                        <li key={j} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <svg className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEW: Counterfactual "What If" Analysis */}
      {formData && availableRoles && availableRoles.length > 1 && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">What Would It Take?</h4>
            </div>
            <button
              onClick={() => setShowCounterfactual(!showCounterfactual)}
              className="px-3 py-2 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              {showCounterfactual ? 'Hide' : 'Explore Alternative Careers'}
            </button>
          </div>
          
          {showCounterfactual && (
            <div className="mt-4">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                See what you'd need to change to qualify for a different career role:
              </p>
              <div className="flex items-center gap-3 mb-4">
                <select
                  className="flex-1 input-base"
                  value={counterfactualTarget}
                  onChange={(e) => setCounterfactualTarget(e.target.value)}
                >
                  <option value="">Select a target career...</option>
                  {availableRoles.filter(r => r !== role).map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <button
                  onClick={() => counterfactualTarget && fetchCounterfactual(counterfactualTarget)}
                  disabled={!counterfactualTarget || loadingCounterfactual}
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loadingCounterfactual ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>

              {counterfactualData && !counterfactualData.error && (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Transition Path</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {counterfactualData.current_role} → {counterfactualData.target_role}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      counterfactualData.feasibility === 'High' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                      counterfactualData.feasibility === 'Moderate' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' :
                      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {counterfactualData.feasibility} Feasibility
                    </span>
                  </div>
                  
                  {counterfactualData.changes_needed && counterfactualData.changes_needed.length > 0 ? (
                    <div className="space-y-3 mt-4">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Changes Needed:</p>
                      {counterfactualData.changes_needed.map((change: any, i: number) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded p-3 border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">{change.feature}</span>
                            <span className={`text-xs font-bold ${
                              change.direction === 'increase' ? 'text-emerald-600' : 'text-blue-600'
                            }`}>
                              {change.direction === 'increase' ? '↑ Increase' : '→ Adjust'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                            Current: <span className="font-semibold">{change.current_value}</span>
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                            Impact: <span className="font-semibold text-purple-600">{change.impact_difference}</span>
                          </p>
                          <p className="text-xs text-slate-700 dark:text-slate-300 italic">{change.suggestion}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                      Your profile is already well-suited for this role!
                    </p>
                  )}
                </div>
              )}

              {counterfactualData?.error && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{counterfactualData.error}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Real model architecture visualization */}
      <ModelArchitectureDisplay />
    </motion.div>
  )
}

export function Insights() {
  const [activeTab, setActiveTab] = useState<'evolution' | 'roadmap' | 'xai' | 'skillgap'>('evolution')
  const [role, setRole] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>(null)
  const [availableRoles, setAvailableRoles] = useState<string[]>([])
  const [topResults, setTopResults] = useState<Array<{ role: string; confidence_score: number }>>([])
  const [compareMode, setCompareMode] = useState(false)
  const [roleB, setRoleB] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)

  // Cache role-specific data so switching tabs/roles is instant
  const [roleData, setRoleData] = useState<Record<string, {
    evolution?: any
    roadmap?: any
    xai?: any
    loading?: { evolution: boolean; roadmap: boolean; xai: boolean }
    error?: { evolution?: string; roadmap?: string; xai?: string }
  }>>({})

  useEffect(() => {
    try {
      // Prefer URL param for role
      const params = new URLSearchParams(window.location.search)
      const qpRole = params.get('role')
      const qpTab = params.get('tab') as 'evolution' | 'roadmap' | 'xai' | 'skillgap' | null

      // Use the same storage keys as CareerRecommendation
      const storedForm = localStorage.getItem('careerFormData')
      const storedResults = localStorage.getItem('careerResults')
      const storedRole = localStorage.getItem('careerSelectedRole')
      if (storedForm) setFormData(JSON.parse(storedForm))

      // Extract available roles from last results (top 3)
      let rolesFromStorage: string[] = []
      if (storedResults) {
        try {
          const arr = JSON.parse(storedResults)
          if (Array.isArray(arr)) {
            setTopResults(arr.filter((x: any) => x && x.role).map((x: any) => ({ role: x.role, confidence_score: Number(x.confidence_score) || 0 })))
            rolesFromStorage = arr.map((r: any) => r?.role).filter(Boolean)
          }
        } catch {}
      }
      setAvailableRoles(rolesFromStorage)

      let selected: string | null = qpRole || storedRole || null
      if (!selected && rolesFromStorage[0]) selected = rolesFromStorage[0]
      if (selected) setRole(selected)
      // Initialize default compare partner if URL specifies or choose second option
      const qpRoleB = params.get('roleB')
      if (qpRoleB && rolesFromStorage.includes(qpRoleB)) {
        setCompareMode(true)
        setRoleB(qpRoleB)
      }

      // Initialize tab from URL if valid
      const validTabs = new Set(['evolution','roadmap','xai','skillgap'])
      if (qpTab && validTabs.has(qpTab)) {
        setActiveTab(qpTab)
      }
    } catch (e) {
      console.warn('No stored context for insights')
    }
  }, [])

  // Fetch evolution for a specific role and cache it
  const fetchEvolutionForRole = async (r: string) => {
    if (!formData || !r) return
    // Skip if already loaded
    if (roleData[r]?.evolution) return
    
    setRoleData(prev => ({
      ...prev,
      [r]: {
        ...(prev[r] || {}),
        loading: { 
          evolution: true, 
          roadmap: prev[r]?.loading?.roadmap || false, 
          xai: prev[r]?.loading?.xai || false 
        },
        error: { 
          ...(prev[r]?.error || {}),
          evolution: undefined 
        }
      }
    }))
    
    try {
      const qs = `?role=${encodeURIComponent(r)}`
      const evoRes = await fetchWithTimeout(apiUrl(`/predict_career_evolution${qs}`), {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(formData),
        timeoutMs: 15000
      })
      const evoData = await evoRes.json()
      
      setRoleData(prev => ({
        ...prev,
        [r]: {
          ...(prev[r] || {}),
          evolution: evoData,
          loading: { 
            evolution: false, 
            roadmap: prev[r]?.loading?.roadmap || false, 
            xai: prev[r]?.loading?.xai || false 
          }
        }
      }))
    } catch (err: any) {
      setRoleData(prev => ({
        ...prev,
        [r]: {
          ...(prev[r] || {}),
          loading: { 
            evolution: false, 
            roadmap: prev[r]?.loading?.roadmap || false, 
            xai: prev[r]?.loading?.xai || false 
          },
          error: {
            ...(prev[r]?.error || {}),
            evolution: err.message || 'Failed to load evolution'
          }
        }
      }))
    }
  }

  // Fetch evolution whenever role or roleB changes
  useEffect(() => {
    if (!formData) return
    if (role) fetchEvolutionForRole(role)
  }, [formData, role])

  useEffect(() => {
    if (!formData || !compareMode) return
    if (roleB) fetchEvolutionForRole(roleB)
  }, [formData, roleB, compareMode])

  // Fetch per-role data (roadmap + XAI) and cache
  const fetchForRole = async (r: string) => {
    if (!formData || !r) return
    setRoleData(prev => ({
      ...prev,
      [r]: {
        ...(prev[r] || {}),
        loading: { 
          evolution: prev[r]?.loading?.evolution || false,
          roadmap: true, 
          xai: true 
        },
        error: { 
          ...(prev[r]?.error || {}),
          roadmap: undefined, 
          xai: undefined 
        }
      }
    }))
    try {
      const [rdRes, xRes] = await Promise.all([
        fetchWithTimeout(apiUrl(`/career_roadmap/${encodeURIComponent(r)}`), { timeoutMs: 20000 }),
        fetchWithTimeout(apiUrl(`/xai_explanations/${encodeURIComponent(r)}?generate_visualization=true`), {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData), timeoutMs: 20000,
        })
      ])
      const [rdData, xData] = await Promise.all([rdRes.json(), xRes.json()])
      setRoleData(prev => ({
        ...prev,
        [r]: {
          ...(prev[r] || {}),
          roadmap: rdData,
          xai: xData,
          loading: { 
            evolution: prev[r]?.loading?.evolution || false,
            roadmap: false, 
            xai: false 
          },
          error: {
            ...(prev[r]?.error || {})
          }
        }
      }))
    } catch (e: any) {
      setRoleData(prev => ({
        ...prev,
        [r]: {
          ...(prev[r] || {}),
          loading: { 
            evolution: prev[r]?.loading?.evolution || false,
            roadmap: false, 
            xai: false 
          },
          error: { 
            ...(prev[r]?.error || {}),
            roadmap: e?.message, 
            xai: e?.message 
          }
        }
      }))
    }
  }

  // Kick off fetch for primary role
  useEffect(() => {
    if (!formData || !role) return
    // Only fetch if not already available
    const cached = roleData[role]
    if (!cached || (!cached.roadmap && !cached.xai)) {
      fetchForRole(role)
    }
  }, [formData, role])

  // Kick off fetch for secondary role when compare is enabled
  useEffect(() => {
    if (!compareMode || !roleB || !formData) return
    const cached = roleData[roleB]
    if (!cached || (!cached.roadmap && !cached.xai)) {
      fetchForRole(roleB)
    }
  }, [compareMode, roleB, formData])

  // Keep URL in sync with role and active tab
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('page', 'insights')
      if (role) url.searchParams.set('role', role)
      else url.searchParams.delete('role')
      if (activeTab) url.searchParams.set('tab', activeTab)
      if (compareMode && roleB) {
        url.searchParams.set('roleB', roleB)
      } else {
        url.searchParams.delete('roleB')
      }
      window.history.replaceState(null, '', url.toString())
    } catch {}
  }, [role, roleB, compareMode, activeTab])

  const tabs: { id: typeof activeTab, label: string }[] = [
    { id: 'evolution', label: 'Career Evolution' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'xai', label: 'XAI' },
    { id: 'skillgap', label: 'Skill Gap' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">Career Insights</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Deep-dive into your recommended career with evolution, roadmap, XAI, and skill gap analysis.</p>
        </div>

        {/* Role selector (top 3) and compare toggle */}
        <div className="mb-6">
          {availableRoles.length > 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-300">Selected role:</span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{role || 'None'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCompareMode(v => !v)}
                      className={`px-3 py-2 rounded-lg text-sm border ${compareMode ? 'border-primary text-primary bg-primary/10' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-transparent'}`}
                    >
                      {compareMode ? 'Comparing 2 careers' : 'Compare two careers'}
                    </button>
                  </div>
                </div>
                {/* Role Cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  {topResults.map((item, idx) => {
                    const isPrimary = role === item.role
                    const isSecondary = roleB === item.role
                    const score = item.confidence_score || 0
                    const percent = Math.max(0, Math.min(100, (score / 10) * 100))
                    const gradients = [
                      { from: '#9b5de5', to: '#7b3fb8' },
                      { from: '#10b981', to: '#059669' },
                      { from: '#6366f1', to: '#4f46e5' },
                    ]
                    const g = gradients[idx % gradients.length]
                    return (
                      <div
                        key={item.role}
                        className={`relative rounded-2xl border-2 p-5 cursor-pointer transition-all bg-white dark:bg-slate-900 ${isPrimary ? 'border-primary shadow-lg' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
                        onClick={() => {
                          if (compareMode && roleB === item.role) return // don't set primary to current secondary
                          setRole(item.role)
                        }}
                        style={{ boxShadow: isPrimary ? `0 10px 30px ${g.from}25` : undefined }}
                        aria-pressed={isPrimary}
                      >
                        {/* Gradient Background Overlay */}
                        <div className="absolute inset-0 opacity-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }} />
                        {/* Rank Badge */}
                        <div className="absolute top-3 right-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow" style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}>#{idx + 1}</div>
                        </div>
                        {/* Header */}
                        <div className="mb-4 pr-10">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{item.role}</h4>
                            {isPrimary && (
                              <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary border border-primary/30 font-bold">Primary</span>
                            )}
                            {compareMode && isSecondary && (
                              <span className="px-2 py-0.5 text-[10px] rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-bold">Comparing</span>
                            )}
                          </div>
                          <div className="flex items-end gap-2">
                            <div className="text-2xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})` }}>{score.toFixed(1)}</div>
                            <div className="text-slate-400 dark:text-slate-500 font-bold">/10</div>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mb-4 h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${percent}%`, background: `linear-gradient(90deg, ${g.from}, ${g.to})` }} />
                        </div>
                        {/* Actions */}
                        <div className="flex items-center justify-between gap-2">
                          <button
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${isPrimary ? 'border-primary bg-primary/10 text-primary' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-transparent hover:border-slate-400 dark:hover:border-slate-500'}`}
                            onClick={(e) => { e.stopPropagation(); if (compareMode && roleB === item.role) return; setRole(item.role) }}
                          >
                            {isPrimary ? 'Selected' : 'Set Primary'}
                          </button>
                          {compareMode && (
                            <button
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${isSecondary ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-transparent hover:border-slate-400 dark:hover:border-slate-500'}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (item.role === role) return // don't set compare to primary
                                setRoleB(prev => prev === item.role ? null : item.role)
                              }}
                            >
                              {isSecondary ? 'Remove Compare' : 'Add to Compare'}
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                {compareMode && (
                  <div className="mt-1">
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Select a second career to compare:</div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">Use the “Add to Compare” button on a card above.</div>
                    {compareMode && (!role || !roleB) && (
                      <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Pick two roles above to enable side-by-side view.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : role ? (
            <div className="mb-6 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-sm text-slate-600 dark:text-slate-300">Selected role:</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{role}</span>
              </div>
            </div>
          ) : null}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-xl font-medium border-2 transition-colors ${activeTab === t.id ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Panels */}
        <div className="space-y-6">
          {/* Evolution - Now role-specific! */}
          {activeTab === 'evolution' && (
            compareMode && role && roleB ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {roleData[role]?.loading?.evolution ? (
                    <div className="card p-6">Loading evolution for {role}…</div>
                  ) : roleData[role]?.evolution ? (
                    <CareerEvolutionDisplay data={roleData[role].evolution} role={role} />
                  ) : roleData[role]?.error?.evolution ? (
                    <div className="card p-6 text-red-500">{roleData[role].error.evolution}</div>
                  ) : (
                    <div className="card p-6">No evolution data available</div>
                  )}
                </div>
                <div>
                  {roleData[roleB]?.loading?.evolution ? (
                    <div className="card p-6">Loading evolution for {roleB}…</div>
                  ) : roleData[roleB]?.evolution ? (
                    <CareerEvolutionDisplay data={roleData[roleB].evolution} role={roleB} />
                  ) : roleData[roleB]?.error?.evolution ? (
                    <div className="card p-6 text-red-500">{roleData[roleB].error.evolution}</div>
                  ) : (
                    <div className="card p-6">No evolution data available</div>
                  )}
                </div>
              </div>
            ) : role ? (
              roleData[role]?.loading?.evolution ? (
                <div className="card p-6">Loading evolution…</div>
              ) : roleData[role]?.evolution ? (
                <CareerEvolutionDisplay data={roleData[role].evolution} role={role} />
              ) : roleData[role]?.error?.evolution ? (
                <div className="card p-6 text-red-500">{roleData[role].error.evolution}</div>
              ) : (
                <div className="card p-6">No evolution data available</div>
              )
            ) : null
          )}

          {/* Roadmap */}
          {activeTab === 'roadmap' && role && (
            compareMode && roleB ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {roleData[role]?.roadmap ? (
                    <EnhancedRoadmapDisplay data={roleData[role].roadmap} role={role} />
                  ) : (
                    <div className="card p-6">Loading roadmap…</div>
                  )}
                </div>
                <div>
                  {roleData[roleB]?.roadmap ? (
                    <EnhancedRoadmapDisplay data={roleData[roleB].roadmap} role={roleB} />
                  ) : (
                    <div className="card p-6">Loading roadmap…</div>
                  )}
                </div>
              </div>
            ) : (
              roleData[role]?.roadmap ? (
                <EnhancedRoadmapDisplay data={roleData[role].roadmap} role={role} />
              ) : (
                <div className="card p-6">Loading roadmap…</div>
              )
            )
          )}

          {/* XAI */}
          {activeTab === 'xai' && role && (
            compareMode && roleB ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {roleData[role]?.xai ? (
                    <XAIDisplay data={roleData[role].xai} role={role} formData={formData} availableRoles={availableRoles} />
                  ) : (
                    <div className="card p-6">Loading XAI…</div>
                  )}
                </div>
                <div>
                  {roleData[roleB]?.xai ? (
                    <XAIDisplay data={roleData[roleB].xai} role={roleB} formData={formData} availableRoles={availableRoles} />
                  ) : (
                    <div className="card p-6">Loading XAI…</div>
                  )}
                </div>
              </div>
            ) : (
              roleData[role]?.xai ? (
                <XAIDisplay data={roleData[role].xai} role={role} formData={formData} availableRoles={availableRoles} />
              ) : (
                <div className="card p-6">Loading XAI…</div>
              )
            )
          )}

          {/* Skill Gap */}
          {activeTab === 'skillgap' && role && formData && (
            compareMode && roleB ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {roleData[role]?.roadmap ? (
                    <SkillGapAnalysis roadmapSkills={roleData[role].roadmap?.skills || []} formData={formData} role={role} />
                  ) : (
                    <div className="card p-6">Preparing skill gap analysis…</div>
                  )}
                </div>
                <div>
                  {roleData[roleB]?.roadmap ? (
                    <SkillGapAnalysis roadmapSkills={roleData[roleB].roadmap?.skills || []} formData={formData} role={roleB} />
                  ) : (
                    <div className="card p-6">Preparing skill gap analysis…</div>
                  )}
                </div>
              </div>
            ) : (
              roleData[role]?.roadmap ? (
                <SkillGapAnalysis roadmapSkills={roleData[role].roadmap?.skills || []} formData={formData} role={role} />
              ) : (
                <div className="card p-6">Preparing skill gap analysis…</div>
              )
            )
          )}
        </div>
      </div>
    </div>
  )
}
