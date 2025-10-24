import React, { useState, useRef, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { EnhancedRoadmapDisplay } from '../components/EnhancedRoadmapDisplay'
import { SkillGapAnalysis } from '../components/SkillGapAnalysis'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

// ==================== MINIMAL PROFESSIONAL COLOR PALETTE ====================
// Primary: Slate/Gray for sophistication
// Accent: Indigo for focus elements
// Success: Emerald for positive metrics
// Neutral: Clean whites and grays

// ==================== DISPLAY COMPONENTS ====================

// Career Evolution Display Component with Professional Timeline
function CareerEvolutionDisplay({ data, role }: { data: any, role: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Career Evolution Path</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Your personalized career trajectory</p>
        </div>
      </div>

      {/* Current Role */}
      <div className="mb-8 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Starting Position</p>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{data.current_role}</h4>
          </div>
        </div>
      </div>

      {/* Trajectory Description */}
      {data.trajectory_description && (
        <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-slate-300">
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{data.trajectory_description}</p>
        </div>
      )}

      {/* Future Roles Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
        
        <div className="space-y-6">
          {data.future_roles && data.future_roles.map((stage: any, i: number) => (
            <div key={i} className="relative pl-16">
              {/* Timeline Node */}
              <div className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center bg-slate-900 dark:bg-slate-100 border-4 border-white dark:border-slate-900">
                <span className="text-white dark:text-slate-900 font-bold text-sm">{stage.stage || i + 1}</span>
              </div>
              
              {/* Stage Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{stage.role}</h5>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{stage.timeframe}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Confidence</p>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">
                      {(stage.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                
                {/* Confidence Bar */}
                <div className="relative w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-1000"
                    style={{ width: `${stage.confidence * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Career Roadmap Display Component with Visual Graphics
function CareerRoadmapDisplay({ data, role }: { data: any, role: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Career Roadmap</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">Your path to {role}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Skills Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Skills to Master</h4>
          </div>
          <div className="space-y-2">
            {data.skills.map((skill: string, i: number) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Certifications</h4>
          </div>
          <div className="space-y-2">
            {data.certifications.map((cert: string, i: number) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Projects to Build</h4>
          </div>
          <div className="space-y-2">
            {data.projects.map((project: string, i: number) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <svg className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{project}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// XAI Display Component with Enhanced Visualizations
function XAIDisplay({ data, role, onDownload }: { data: any, role: string, onDownload: (role: string, data: any) => void }) {
  const [showChart, setShowChart] = useState<boolean>(false)

  // Prepare chart data from feature contributions (fallback if shap_values is present)
  const featureMap: Record<string, number> = data?.feature_contributions || data?.shap_values || {}
  const labels = Object.keys(featureMap)
  const values = labels.map(l => featureMap[l])
  const backgroundColors = values.map(v => v >= 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)')
  const borderColors = values.map(v => v >= 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)')

  const chartData = {
    labels,
    datasets: [
      {
        label: 'SHAP Contribution',
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.2)' },
        ticks: { callback: (val: any) => `${val}` },
      },
    },
  } as const

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">XAI Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Explainable AI for {role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChart(!showChart)}
            className="px-3 py-2 rounded-lg font-medium border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
          >
            {showChart ? 'Show Image' : 'Interactive Chart'}
          </button>
          <button
            onClick={() => onDownload(role, data)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border-l-4 border-slate-300">
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* SHAP Visualization */}
      {(!showChart && data.visualization) && (
        <div className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-800 rounded-lg p-6 border border-indigo-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Feature Importance Visualization</h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-indigo-200 dark:border-slate-700">
            <img 
              src={`http://localhost:8000${data.visualization}`}
              alt="SHAP Visualization - Feature Importance"
              className="w-full h-auto rounded"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.innerHTML = '<div class="text-center py-8 text-slate-500 dark:text-slate-400"><p>Visualization unavailable. Check the detailed factors below.</p></div>'
                }
              }}
            />
          </div>
        </div>
      )}

      {/* ChartJS fallback/alternative */}
      {(showChart || !data.visualization) && labels.length > 0 && (
        <div className="mb-6 bg-white dark:bg-slate-900 rounded-lg p-6 border border-indigo-100 dark:border-slate-700">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Feature Importance (Interactive)</h4>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      {/* Top Factors */}
      {data.top_factors && data.top_factors.length > 0 && (
        <div className="mb-6">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Top Influencing Factors</h4>
          <div className="grid gap-3">
            {data.top_factors.map((factor: any, i: number) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm ${
                      factor.impact === 'positive' ? 'bg-emerald-500' : 'bg-red-500'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-slate-900 dark:text-white mb-1">{factor.feature}</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{factor.insight}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg font-bold text-sm ${
                    factor.impact === 'positive' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {factor.impact === 'positive' ? '↑' : '↓'} {factor.contribution.toFixed(3)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIME Explanation */}
      {data.lime_explanation && data.lime_explanation.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Detailed Explanations</h4>
          <div className="space-y-2">
            {data.lime_explanation.map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="w-6 h-6 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== END DISPLAY COMPONENTS ====================

// ==================== COMPARISON VIEW (SIDE-BY-SIDE) ====================
function CompareView({
  roles,
  results,
  formData,
  fetchers
}: {
  roles: string[]
  results: { role: string, confidence_score: number }[]
  formData: any
  fetchers: { roadmap: (role: string, data: any) => Promise<any>, xai: (role: string, data: any) => Promise<any> }
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Record<string, { roadmap?: any, xai?: any }>>({})
  const [showRoadmap, setShowRoadmap] = useState(true)
  const [showXai, setShowXai] = useState(true)
  const [showCharts, setShowCharts] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [r1, r2] = roles
        const [roadmap1, roadmap2, xai1, xai2] = await Promise.all([
          fetchers.roadmap(r1, formData),
          fetchers.roadmap(r2, formData),
          fetchers.xai(r1, formData),
          fetchers.xai(r2, formData)
        ])
        if (cancelled) return
        setData({
          [r1]: { roadmap: roadmap1, xai: xai1 },
          [r2]: { roadmap: roadmap2, xai: xai2 }
        })
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load comparison data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    if (roles.length === 2 && formData) load()
    return () => { cancelled = true }
  }, [roles.join('|'), formData])

  const getRecMeta = (role: string) => {
    const rec = results.find(r => r.role === role)
    const rank = rec ? results.indexOf(rec) + 1 : undefined
    const score = rec?.confidence_score ?? 0
    return { rank, score }
  }

  const buildChartConfig = (xai: any) => {
    const featureMap: Record<string, number> = xai?.feature_contributions || xai?.shap_values || {}
    const labels = Object.keys(featureMap)
    const values = labels.map(l => featureMap[l])
    const backgroundColors = values.map(v => v >= 0 ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)')
    const borderColors = values.map(v => v >= 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(239, 68, 68, 1)')
    return {
      data: {
        labels,
        datasets: [{ label: 'Feature Contribution', data: values, backgroundColor: backgroundColors, borderColor: borderColors, borderWidth: 1 }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(148, 163, 184, 0.2)' } } }
      } as const
    }
  }

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
      <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">{title}</h4>
      {children}
    </div>
  )

  const computeDiff = (a?: string[], b?: string[]) => {
    const arrA = (a || []).filter(Boolean)
    const arrB = (b || []).filter(Boolean)
    const mapA = new Map<string, string>()
    const mapB = new Map<string, string>()
    arrA.forEach(s => mapA.set(s.toLowerCase(), s))
    arrB.forEach(s => mapB.set(s.toLowerCase(), s))
    const A = new Set(mapA.keys())
    const B = new Set(mapB.keys())
    const common = [...A].filter(x => B.has(x)).map(x => mapA.get(x) as string)
    const uniqueA = [...A].filter(x => !B.has(x)).map(x => mapA.get(x) as string)
    const uniqueB = [...B].filter(x => !A.has(x)).map(x => mapB.get(x) as string)
    return { common, uniqueA, uniqueB }
  }

  if (loading) {
    return (
      <div className="mt-6 flex items-center gap-3 text-slate-600 dark:text-slate-300">
        <div className="w-6 h-6 border-4 border-slate-200 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-100 rounded-full animate-spin" />
        Loading comparison...
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
        {error}
      </div>
    )
  }

  const [r1, r2] = roles
  const d1 = data[r1]
  const d2 = data[r2]
  const m1 = getRecMeta(r1)
  const m2 = getRecMeta(r2)
  const diffSections = [
    { key: 'skills', label: 'Skills' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'projects', label: 'Projects' }
  ] as const

  return (
    <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Detailed Side-by-Side Comparison</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRoadmap(v => !v)}
            aria-pressed={showRoadmap}
            className={`px-3 py-1.5 text-xs rounded-lg border ${showRoadmap ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
          >
            {showRoadmap ? 'Hide Roadmap' : 'Show Roadmap'}
          </button>
          <button
            onClick={() => setShowXai(v => !v)}
            aria-pressed={showXai}
            className={`px-3 py-1.5 text-xs rounded-lg border ${showXai ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
          >
            {showXai ? 'Hide XAI' : 'Show XAI'}
          </button>
          <button
            onClick={() => setShowCharts(v => !v)}
            aria-pressed={showCharts}
            className={`px-3 py-1.5 text-xs rounded-lg border ${showCharts ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
          >
            {showCharts ? 'Compact (No Charts)' : 'Show Charts'}
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[{ role: r1, meta: m1, d: d1 }, { role: r2, meta: m2, d: d2 }].map(({ role, meta, d }) => (
          <div key={role} className="rounded-lg border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/50 dark:bg-slate-800/30">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">{role}</h4>
                {typeof meta.rank === 'number' && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">Rank #{meta.rank}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Match Score</p>
                <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{meta.score.toFixed(1)}/10</p>
              </div>
            </div>
            <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${(meta.score / 10) * 100}%` }} />
            </div>

            {/* Roadmap snapshot */}
            {showRoadmap && d?.roadmap && (
              <Section title="Roadmap Snapshot">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Skills</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{d.roadmap.skills?.length ?? 0}</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Certifications</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{d.roadmap.certifications?.length ?? 0}</div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Projects</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white">{d.roadmap.projects?.length ?? 0}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Top Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {(d.roadmap.skills || []).slice(0, 6).map((s: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600">{s}</span>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {/* XAI snapshot */}
            {showXai && d?.xai && (
              <Section title="Top Influencing Factors">
                <div className="space-y-2 mb-3">
                  {(d.xai.top_factors || []).slice(0, 4).map((f: any, i: number) => (
                    <div key={i} className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${f.impact === 'positive' ? 'bg-emerald-500' : 'bg-red-500'}`}>{i+1}</div>
                        <div className="text-sm text-slate-800 dark:text-slate-200 font-medium">{f.feature}</div>
                      </div>
                      <div className={`text-xs font-bold px-2 py-0.5 rounded ${f.impact === 'positive' ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30' : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'}`}>
                        {f.impact === 'positive' ? '↑' : '↓'} {Number(f.contribution).toFixed(3)}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chart fallback */}
                {showCharts && (() => {
                  const { data: chartData, options } = buildChartConfig(d.xai)
                  return chartData.labels.length > 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3">
                      <Bar data={chartData} options={options} />
                    </div>
                  ) : null
                })()}
              </Section>
            )}
          </div>
        ))}
      </div>

      {/* Overlap & Differences across both careers */}
      {d1?.roadmap && d2?.roadmap && (
        <div className="mt-8 rounded-lg border border-slate-200 dark:border-slate-700 p-5 bg-slate-50/50 dark:bg-slate-800/30">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Overlap and Differences</h4>
          {diffSections.map(({ key, label }) => {
            const diff = computeDiff((d1.roadmap as any)[key], (d2.roadmap as any)[key])
            return (
              <div key={key} className="mb-5 last:mb-0">
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{label}</div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Common</div>
                    <div className="flex flex-wrap gap-2">
                      {diff.common.length > 0 ? diff.common.slice(0, 12).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">{s}</span>
                      )) : <span className="text-xs text-slate-500 dark:text-slate-400">None</span>}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Unique to {r1}</div>
                    <div className="flex flex-wrap gap-2">
                      {diff.uniqueA.length > 0 ? diff.uniqueA.slice(0, 12).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">{s}</span>
                      )) : <span className="text-xs text-slate-500 dark:text-slate-400">None</span>}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Unique to {r2}</div>
                    <div className="flex flex-wrap gap-2">
                      {diff.uniqueB.length > 0 ? diff.uniqueB.slice(0, 12).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">{s}</span>
                      )) : <span className="text-xs text-slate-500 dark:text-slate-400">None</span>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
// ==================== END COMPARISON VIEW ====================

const fieldConfig = [
  // Academic Performance (9 fields) - Percentages 0-100
  { name: 'Acedamic_percentage_in_Operating_Systems', label: 'Operating Systems score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Algorithms', label: 'Algorithms score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Programming_Concepts', label: 'Programming Concepts score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Software_Engineering', label: 'Software Engineering score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Computer_Networks', label: 'Computer Networks score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Electronics_Subjects', label: 'Electronics score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Computer_Architecture', label: 'Computer Architecture score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Mathematics', label: 'Mathematics score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  { name: 'Percentage_in_Communication_skills', label: 'Communication Skills score (%)', type: 'number', min: 0, max: 100, category: 'Academic Performance' },
  
  // Work & Skills Ratings
  { name: 'Hours_working_per_day', label: 'How many hours per day do you work or study?', type: 'number', min: 1, max: 24, category: 'Work & Skills' },
  { name: 'Logical_quotient_rating', label: 'Your logical thinking (1-10)', type: 'number', min: 1, max: 10, category: 'Work & Skills' },
  { name: 'Hackathons', label: 'Hackathons participated in', type: 'number', min: 0, max: 10, category: 'Work & Skills' },
  { name: 'Coding_skills_rating', label: 'Your coding skills (1-10)', type: 'number', min: 1, max: 10, category: 'Work & Skills' },
  { name: 'Public_speaking_points', label: 'Public speaking comfort (1-10)', type: 'number', min: 1, max: 10, category: 'Work & Skills' },
  
  // Personal Capabilities - yes/no and poor/medium/excellent
  { name: 'Can_work_long_time_before_system', label: 'Comfortable working at a computer for long hours?', type: 'radio', options: ['yes', 'no'], category: 'Personal Capabilities' },
  { name: 'Self_learning_capability', label: 'Enjoy self-directed learning?', type: 'radio', options: ['yes', 'no'], category: 'Personal Capabilities' },
  { name: 'Reading_and_writing_skills', label: 'Your reading & writing skills', type: 'radio', options: ['poor', 'medium', 'excellent'], category: 'Personal Capabilities' },
  { name: 'Memory_capability_score', label: 'Your memory & recall ability', type: 'radio', options: ['poor', 'medium', 'excellent'], category: 'Personal Capabilities' },
  
  // Additional Learning - multi-select (sent as comma-separated)
  { name: 'Extra_courses_did', label: 'Taken any extra courses?', type: 'checkbox', options: ['Yes', 'No'], category: 'Additional Learning' },
  { name: 'Certifications', label: 'Certifications you have', type: 'checkbox', options: ['app development', 'distro making', 'full stack', 'hadoop', 'information security', 'machine learning', 'python', 'r programming', 'shell programming'], category: 'Additional Learning' },
  { name: 'Workshops', label: 'Workshops attended', type: 'checkbox', options: ['cloud computing', 'data science', 'database security', 'game development', 'hacking', 'system designing', 'testing', 'web technologies'], category: 'Additional Learning' },
  
  // Interests & Career Preferences
  { name: 'Interested_subjects', label: 'Subjects that interest you', type: 'checkbox', options: ['Cloud Computing', 'Computer Architecture', 'data engineering', 'hacking', 'IOT', 'Management', 'networks', 'parallel computing', 'programming', 'security', 'Software Engineering'], category: 'Interests & Preferences' },
  { name: 'Interested_career_area', label: 'Career area drawn to', type: 'radio', options: ['Business process analyst', 'Cloud Computing', 'Data engineering', 'developer', 'security', 'system developer', 'testing', 'Web development'], category: 'Interests & Preferences' },
  { name: 'Type_of_company_want_to_settle_in', label: 'Type of company to join', type: 'radio', options: ['BPA', 'Cloud Services', 'Finance', 'IoT', 'product development', 'Product based', 'SAP', 'Testing and Maintainance Services', 'Web Services'], category: 'Interests & Preferences' },
  { name: 'Job_Higher_Studies', label: 'After graduation plans', type: 'radio', options: ['Job', 'Higher Studies', 'Both'], category: 'Interests & Preferences' },
  { name: 'Management_or_Technical', label: 'Management or technical track?', type: 'radio', options: ['Management', 'Technical'], category: 'Interests & Preferences' },
  
  // Work Style
  { name: 'Hard_smart_worker', label: 'Your working style', type: 'radio', options: ['hard worker', 'smart worker', 'both'], category: 'Work Style' },
  { name: 'Worked_in_teams_ever', label: 'Worked in teams?', type: 'radio', options: ['yes', 'no'], category: 'Work Style' },
] as const

const api = {
  top3: async (data: any) => {
    const res = await fetch('/predict_top3_careers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  xai: async (role: string, data: any) => {
    const res = await fetch(`/xai_explanations/${encodeURIComponent(role)}?generate_visualization=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  roadmap: async (role: string, data: any) => {
    const res = await fetch(`/career_roadmap/${encodeURIComponent(role)}`)
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  evolution: async (data: any) => {
    const res = await fetch('/predict_career_evolution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
}

function NumberInput({ name, min, max }: { name: string, min: number, max: number }) {
  return (
    <div className="relative group">
      <input
        type="number"
        name={name}
        min={min}
        max={max}
        placeholder="e.g., 85"
        required
        className="input-base"
      />
      <div className="absolute -bottom-5 left-0 text-xs text-slate-500 dark:text-slate-400 opacity-0 group-focus-within:opacity-100 transition-opacity">
        Range: {min}-{max}
      </div>
    </div>
  )
}

function RadioGroup({ name, options }: { name: string, options: readonly string[] | string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map(o => (
        <label key={o} className="relative flex-1 min-w-[120px] cursor-pointer group">
          <input
            type="radio"
            name={name}
            value={o as string}
            required
            className="peer sr-only"
          />
          <div className="px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center font-medium transition-all duration-300 ease-in-out peer-checked:border-primary-600 peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-slate-900 dark:peer-checked:text-white hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md hover:scale-[1.02] focus-within:ring-2 focus-within:ring-primary-400">
            {o}
          </div>
        </label>
      ))}
    </div>
  )
}

function CheckboxGroup({ name, options }: { name: string, options: readonly string[] | string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {options.map(o => (
        <label key={o} className="checkbox-label relative cursor-pointer group block">
          <input
            type="checkbox"
            name={name}
            value={o as string}
            className="checkbox-input peer sr-only"
          />
          <div className="checkbox-box px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium transition-all duration-300 ease-in-out peer-checked:border-primary-600 peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-slate-900 dark:peer-checked:text-white hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md hover:scale-[1.02] flex items-center justify-between focus-within:ring-2 focus-within:ring-primary-400">
            <span>{o}</span>
            <div className="checkbox-icon-container relative w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center transition-all">
              <svg className="checkbox-icon w-3.5 h-3.5 text-white opacity-0 scale-50 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeWidth="3">
                <polyline points="3 8 6 11 13 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </label>
      ))}
    </div>
  )
}

export function CareerRecommendation({ onCareersRecommended }: { onCareersRecommended?: (careers: { career: string, probability: number }[]) => void }) {
  const [results, setResults] = useState<{ role: string, confidence_score: number }[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<any>(null)
  const [formCollapsed, setFormCollapsed] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  
  // Selected career for deep dive
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'evolution' | 'roadmap' | 'xai' | 'skillgap'>('evolution')
  
  // Data storage for selected career
  const [careerDetails, setCareerDetails] = useState<{
    evolution?: any,
    roadmap?: any,
    xai?: any,
    loading: { evolution: boolean, roadmap: boolean, xai: boolean, skillgap: boolean },
    error: { evolution?: string, roadmap?: string, xai?: string, skillgap?: string }
  }>({
    loading: { evolution: false, roadmap: false, xai: false, skillgap: false },
    error: {}
  })
  
  // Refs for smooth scrolling
  const resultsRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  const categories = [...new Set(fieldConfig.map(f => f.category))]

  // Scroll to results after form submission
  useEffect(() => {
    if (results) {
      setFormCollapsed(true)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [results])

  // Restore form from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('careerFormData')
    if (!saved) return
    try {
      const data = JSON.parse(saved)
      const form = formRef.current
      if (!form) return
      // Set numbers
      Object.entries(data).forEach(([name, value]) => {
        const els = form.querySelectorAll<HTMLInputElement>(`[name="${name}"]`)
        if (!els.length) return
        const v = value as any
        const isArray = Array.isArray(v)
        const values = isArray ? v : typeof v === 'string' ? (v.includes(',') ? v.split(',') : [v]) : [v]
        els.forEach(el => {
          if (el.type === 'number') {
            el.value = String(v ?? '')
          } else if (el.type === 'radio') {
            el.checked = el.value === String(v)
          } else if (el.type === 'checkbox') {
            el.checked = values.includes(el.value)
          }
        })
      })
    } catch {}
  }, [])

  // Save form changes to localStorage
  useEffect(() => {
    const form = formRef.current
    if (!form) return
    const handler = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (!target || !target.name) return
      const name = target.name
      const saved = (() => { try { return JSON.parse(localStorage.getItem('careerFormData') || '{}') } catch { return {} } })()
      let value: any = ''
      if (target.type === 'checkbox') {
        const checked = Array.from(form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)).map(x => x.value)
        value = checked
      } else if (target.type === 'radio') {
        const checked = form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
        value = checked ? checked.value : ''
      } else if (target.type === 'number') {
        value = target.value
      }
      const updated = { ...saved, [name]: value }
      localStorage.setItem('careerFormData', JSON.stringify(updated))
    }
    form.addEventListener('change', handler)
    return () => form.removeEventListener('change', handler)
  }, [])

  // Select a career for deep dive
  const selectCareer = (role: string) => {
    setSelectedCareer(role)
    setActiveTab('evolution')
    setCareerDetails({
      loading: { evolution: false, roadmap: false, xai: false, skillgap: false },
      error: {}
    })
    // Fetch evolution data immediately
    fetchDataForTab('evolution', role)
    // Scroll to details section
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Fetch data for active tab
  const fetchDataForTab = async (tab: 'evolution' | 'roadmap' | 'xai' | 'skillgap', career?: string) => {
    const targetCareer = career || selectedCareer
    if (!targetCareer || !formData) return
    
    // Skill gap doesn't need API call, it's computed locally
    if (tab === 'skillgap') return
    
    // Check if data already exists
    if (careerDetails[tab]) return
    
    setCareerDetails(prev => ({
      ...prev,
      loading: { ...prev.loading, [tab]: true },
      error: { ...prev.error, [tab]: undefined }
    }))
    
    try {
      let data: any
      if (tab === 'evolution') {
        data = await api.evolution(formData)
      } else if (tab === 'roadmap') {
        data = await api.roadmap(targetCareer, formData)
      } else if (tab === 'xai') {
        data = await api.xai(targetCareer, formData)
      }
      
      setCareerDetails(prev => ({
        ...prev,
        [tab]: data,
        loading: { ...prev.loading, [tab]: false }
      }))
    } catch (e: any) {
      setCareerDetails(prev => ({
        ...prev,
        loading: { ...prev.loading, [tab]: false },
        error: { ...prev.error, [tab]: e.message || `Failed to load ${tab}` }
      }))
    }
  }

  // Change active tab
  const changeTab = (tab: 'evolution' | 'roadmap' | 'xai' | 'skillgap') => {
    setActiveTab(tab)
    fetchDataForTab(tab)
  }

  // Toggle a career in the comparison selection (max 2)
  const toggleCompare = (role: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(role)) return prev.filter(r => r !== role)
      if (prev.length >= 2) return prev
      return [...prev, role]
    })
  }

  const downloadXAIReport = (career: string, xaiData: any) => {
    const content = `
Career: ${career}
Generated: ${new Date().toLocaleString()}

SUMMARY:
${xaiData.summary || 'N/A'}

TOP FACTORS:
${xaiData.top_factors?.map((f: any, i: number) => 
  `${i + 1}. ${f.feature} (${f.impact}): ${f.contribution.toFixed(3)}
     ${f.insight}`
).join('\n') || 'N/A'}

DETAILED EXPLANATIONS:
${xaiData.lime_explanation?.map((e: string, i: number) => `${i + 1}. ${e}`).join('\n') || 'N/A'}
    `.trim()
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `XAI_Report_${career.replace(/\s+/g, '_')}_${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSelectedCareer(null)
    setSelectedForCompare([])
    const form = e.currentTarget
    const formDataObj: any = {}

    fieldConfig.forEach(f => {
      if (f.type === 'checkbox') {
        const checkboxes = form.querySelectorAll(`input[name="${f.name}"]:checked`)
        const selected = Array.from(checkboxes).map((cb: any) => cb.value)
        formDataObj[f.name] = selected.join(',')
      } else if (f.type === 'radio') {
        const radio = form.querySelector(`input[name="${f.name}"]:checked`) as HTMLInputElement | null
        formDataObj[f.name] = radio ? radio.value : ''
      } else if (f.type === 'number') {
        const el = form.elements.namedItem(f.name) as HTMLInputElement
        const num = Number(el.value)
        formDataObj[f.name] = isNaN(num) ? 0 : num
      }
    })

    try {
      const data = await api.top3(formDataObj)
      setResults(data.top_predictions)
      setFormData(formDataObj) // Store form data for later API calls
      
      // Pass recommended careers to parent for resume analysis
      if (onCareersRecommended && data.top_predictions) {
        onCareersRecommended(data.top_predictions.map((pred: any) => ({
          career: pred.role,
          probability: pred.confidence_score
        })))
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent mb-2">
            Find your best-fit careers
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Honest, clear guidance based on your strengths—no fluff.
          </p>
        </div>

        {/* Results Section */}
        {results && (
          <div ref={resultsRef} className="mb-8 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                    <svg className="w-8 h-8 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Your Top 3 Career Matches
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Select a career to explore in detail</p>
                </div>
                {!compareMode && selectedForCompare.length === 0 && (
                  <button
                    onClick={() => setCompareMode(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors border border-indigo-200 dark:border-indigo-800 shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Compare Careers
                  </button>
                )}
              </div>

              {compareMode && (
                <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border-l-4 border-indigo-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <p className="text-indigo-900 dark:text-indigo-200 font-medium">
                        Select up to 2 careers to compare • Selected: <span className="font-bold">{selectedForCompare.length}/2</span>
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCompareMode(false)
                        setSelectedForCompare([])
                      }}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-200 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-3">
                {results.map((r, idx) => {
                  const isSelected = selectedCareer === r.role
                  const isForCompare = selectedForCompare.includes(r.role)
                  const gradientColors = [
                    'from-indigo-500 to-purple-500',
                    'from-emerald-500 to-teal-500',
                    'from-purple-500 to-pink-500'
                  ]
                  
                  return (
                    <div key={idx} className="relative group">
                      {/* Career Card */}
                      <div 
                        className={`relative bg-white dark:bg-slate-800 rounded-xl p-6 border-2 transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? 'border-indigo-500 dark:border-indigo-400 shadow-xl shadow-indigo-100 dark:shadow-indigo-900/20' 
                            : isForCompare
                            ? 'border-emerald-500 dark:border-emerald-400 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg'
                        }`}
                        onClick={() => !compareMode && selectCareer(r.role)}
                      >
                        {/* Rank Badge */}
                        <div className={`absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br ${gradientColors[idx]} text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg`}>
                          #{idx + 1}
                        </div>
                        
                        {/* Compare Checkbox */}
                        {compareMode && (
                          <div className="absolute top-3 left-3 z-10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleCompare(r.role)
                              }}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                isForCompare
                                  ? 'bg-slate-900 dark:bg-slate-100 border-slate-900 dark:border-slate-100'
                                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600'
                              }`}
                            >
                              {isForCompare && (
                                <svg className="w-4 h-4 text-white dark:text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                          </div>
                        )}
                        
                        {/* Career Title */}
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 mt-2">
                          {r.role}
                        </h3>
                        
                        {/* Confidence Score */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Match Score</span>
                            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                              {r.confidence_score.toFixed(1)}/10
                            </span>
                          </div>
                          <div className="relative w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute inset-0 bg-gradient-to-r ${gradientColors[idx]} rounded-full transition-all duration-1000`}
                              style={{ width: `${(r.confidence_score / 10) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        {!compareMode && (
                          <button className={`btn-primary w-full py-2.5 rounded-xl bg-gradient-to-r ${gradientColors[idx]}`}>
                            See details →
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              {selectedForCompare.length === 2 && (
                <div className="mt-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-xl shadow-lg p-8 border-2 border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Career Comparison</h3>
                    </div>
                    <button
                      onClick={() => setSelectedForCompare([])}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear
                    </button>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    {selectedForCompare.map((role, idx) => {
                      const rec = results.find(r => r.role === role)
                      if (!rec) return null
                      const rankIdx = results.indexOf(rec)
                      const gradientColors = [
                        'from-indigo-500 to-purple-500',
                        'from-emerald-500 to-teal-500',
                        'from-purple-500 to-pink-500'
                      ]
                      return (
                        <div key={role} className="bg-white dark:bg-slate-900 rounded-xl border-2 border-indigo-100 dark:border-slate-700 p-6 hover:shadow-xl transition-all">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{rec.role}</h4>
                            <div className={`px-3 py-1 bg-gradient-to-r ${gradientColors[rankIdx]} text-white text-xs font-bold rounded-full`}>
                              Rank #{rankIdx + 1}
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Match Score</span>
                              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{rec.confidence_score.toFixed(1)}/10</span>
                            </div>
                            <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className={`h-full bg-gradient-to-r ${gradientColors[rankIdx]} transition-all duration-1000`} style={{ width: `${(rec.confidence_score / 10) * 100}%` }} />
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => selectCareer(rec.role)}
                              className={`flex-1 px-4 py-2.5 bg-gradient-to-r ${gradientColors[rankIdx]} text-white rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all`}
                            >
                              Explore Details →
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Detailed side-by-side comparison */}
                  <CompareView roles={selectedForCompare} results={results} formData={formData} fetchers={{ roadmap: api.roadmap, xai: api.xai }} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Selected Career Details with Tabs */}
        {selectedCareer && (
          <div ref={detailsRef} className="mb-8 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
              {/* Header with Back Button */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{selectedCareer}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Detailed Career Insights</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCareer(null)
                    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Careers
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 overflow-x-auto" role="tablist" aria-label="Career details tabs">
                {(['evolution', 'roadmap', 'skillgap', 'xai'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => changeTab(tab)}
                    className={`px-6 py-3 font-medium text-sm transition-all relative whitespace-nowrap ${
                      activeTab === tab
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`panel-${tab}`}
                    tabIndex={activeTab === tab ? 0 : -1}
                  >
                    {tab === 'skillgap' ? 'Skill Gap' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-slate-100" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="animate-fadeIn" onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  const tabs: Array<'evolution'|'roadmap'|'xai'|'skillgap'> = ['evolution','roadmap','skillgap','xai']
                  const idx = tabs.indexOf(activeTab)
                  const next = e.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length
                  changeTab(tabs[next])
                }
              }}>
                {careerDetails.loading[activeTab] && (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-100 rounded-full animate-spin mb-4" />
                    <p className="text-slate-600 dark:text-slate-400">Loading {activeTab}...</p>
                  </div>
                )}

                {careerDetails.error[activeTab] && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-700 dark:text-red-400">{careerDetails.error[activeTab]}</p>
                  </div>
                )}

                {!careerDetails.loading[activeTab] && !careerDetails.error[activeTab] && (
                  <>
                    {activeTab === 'evolution' && careerDetails.evolution && (
                      <CareerEvolutionDisplay data={careerDetails.evolution} role={selectedCareer} />
                    )}
                    {activeTab === 'roadmap' && careerDetails.roadmap && (
                      <EnhancedRoadmapDisplay data={careerDetails.roadmap} role={selectedCareer} />
                    )}
                    {activeTab === 'skillgap' && careerDetails.roadmap && formData && (
                      <SkillGapAnalysis 
                        roadmapSkills={careerDetails.roadmap.skills || []} 
                        formData={formData} 
                        role={selectedCareer} 
                      />
                    )}
                    {activeTab === 'xai' && careerDetails.xai && (
                      <XAIDisplay data={careerDetails.xai} role={selectedCareer} onDownload={downloadXAIReport} />
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86l-7.4 12.84A2 2 0 004.6 20h14.8a2 2 0 001.71-3.3L13.7 3.86a2 2 0 00-3.42 0z" />
              </svg>
              {error}
            </p>
          </div>
        )}

        {/* Form - Collapsible after results */}
        <div className={`transition-all duration-300 ${formCollapsed && results ? 'max-h-20 overflow-hidden' : ''}`}>
          {formCollapsed && results && (
            <button
              onClick={() => setFormCollapsed(false)}
              className="w-full mb-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex items-center justify-between"
            >
              <span className="text-slate-900 dark:text-white font-medium">Edit Your Profile</span>
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        
          {(!formCollapsed || !results) && (
            <form ref={formRef} onSubmit={onSubmit} className="space-y-6">
              {results && (
                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={() => setFormCollapsed(true)}
                    className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                  >
                    Collapse Form
                  </button>
                </div>
              )}
              
              {categories.map(category => (
                <div key={category} className="card p-8">
                  <h2 className="section-header">
                    {category}
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    {fieldConfig
                      .filter(f => f.category === category)
                      .map(f => (
                        <div key={f.name} className="space-y-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            {f.label}
                            {f.type === 'checkbox' && <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">(select all that apply)</span>}
                          </label>
                          {f.type === 'number' && <NumberInput name={f.name} min={f.min!} max={f.max!} />}
                          {f.type === 'radio' && <RadioGroup name={f.name} options={f.options!} />}
                          {f.type === 'checkbox' && <CheckboxGroup name={f.name} options={f.options!} />}
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-12 py-4 text-lg rounded-2xl"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Analyzing your profile…
                    </>
                  ) : (
                    <>
                      Get my career recommendations
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    
    {/* Floating Compare Tray */}
    {selectedForCompare.length > 0 && (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 shadow-xl rounded-full px-4 py-2">
          <div className="flex -space-x-2">
            {selectedForCompare.map((r, i) => (
              <div key={r} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                {i+1}
              </div>
            ))}
          </div>
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {selectedForCompare.length === 1 ? 'Select one more career to compare' : 'Ready to compare'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCompareMode(true)
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50"
              disabled={selectedForCompare.length < 2}
            >
              Compare Now
            </button>
            <button
              onClick={() => setSelectedForCompare([])}
              className="px-3 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}
