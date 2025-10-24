import React, { useEffect, useState } from 'react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { useProgressTracking } from '../hooks/useProgressTracking'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

interface EnhancedRoadmapDisplayProps {
  data: {
    skills: string[]
    certifications: string[]
    projects: string[]
  }
  role: string
}

export function EnhancedRoadmapDisplay({ data, role }: EnhancedRoadmapDisplayProps) {
  const { initializeProgress, toggleItem, getRoleProgress } = useProgressTracking()
  const [showVisualization, setShowVisualization] = useState(false)

  const roleProgress = getRoleProgress(role)

  // Initialize progress tracking for this roadmap
  useEffect(() => {
    initializeProgress(role, data.skills, data.certifications, data.projects)
  }, [role, data.skills, data.certifications, data.projects])

  // Calculate category completion percentages
  const getCategoryProgress = () => {
    if (!roleProgress) return { skills: 0, certifications: 0, projects: 0 }

    const skillItems = roleProgress.items.filter((i) => i.type === 'skill')
    const certItems = roleProgress.items.filter((i) => i.type === 'certification')
    const projectItems = roleProgress.items.filter((i) => i.type === 'project')

    return {
      skills: skillItems.length
        ? (skillItems.filter((i) => i.completed).length / skillItems.length) * 100
        : 0,
      certifications: certItems.length
        ? (certItems.filter((i) => i.completed).length / certItems.length) * 100
        : 0,
      projects: projectItems.length
        ? (projectItems.filter((i) => i.completed).length / projectItems.length) * 100
        : 0,
    }
  }

  const categoryProgress = getCategoryProgress()

  // Prepare radar chart data
  const radarData = {
    labels: ['Skills', 'Certifications', 'Projects'],
    datasets: [
      {
        label: 'Your Progress',
        data: [categoryProgress.skills, categoryProgress.certifications, categoryProgress.projects],
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
      {
        label: 'Target (100%)',
        data: [100, 100, 100],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        borderWidth: 1,
        borderDash: [5, 5],
        pointRadius: 0,
      },
    ],
  }

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value: any) => `${value}%`,
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.parsed.r.toFixed(1)}%`,
        },
      },
    },
  }

  // Calculate estimated time to completion
  const estimateCompletion = () => {
    if (!roleProgress || roleProgress.readinessScore === 100) return null

    const completedItems = roleProgress.items.filter((i) => i.completed)
    if (completedItems.length === 0) return null

    // Calculate average days per completed item
    const now = new Date()
    const completionDates = completedItems
      .filter((i) => i.completedDate)
      .map((i) => new Date(i.completedDate!).getTime())

    if (completionDates.length < 2) return null

    completionDates.sort()
    const firstDate = completionDates[0]
    const lastDate = completionDates[completionDates.length - 1]
    const daysElapsed = (lastDate - firstDate) / (1000 * 60 * 60 * 24)
    const avgDaysPerItem = daysElapsed / completedItems.length

    const remainingItems = roleProgress.items.length - completedItems.length
    const estimatedDays = Math.ceil(remainingItems * avgDaysPerItem)

    if (estimatedDays < 7) return `${estimatedDays} days`
    if (estimatedDays < 30) return `${Math.ceil(estimatedDays / 7)} weeks`
    return `${Math.ceil(estimatedDays / 30)} months`
  }

  const getItemById = (itemId: string) => {
    return roleProgress?.items.find((i) => i.id === itemId)
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
      {/* Header with Readiness Score */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white dark:text-slate-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Career Roadmap
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your path to {role}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Career Readiness</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {roleProgress?.readinessScore || 0}%
          </p>
          {estimateCompletion() && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Est. completion: {estimateCompletion()}
            </p>
          )}
        </div>
      </div>

      {/* Progress Visualization Toggle */}
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setShowVisualization(!showVisualization)}
          className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        >
          {showVisualization ? 'Hide' : 'Show'} Progress Visualization
        </button>
      </div>

      {/* Radar Chart Visualization */}
      {showVisualization && (
        <div className="mb-8 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-4 text-center">
            Growth Radar Chart
          </h4>
          <div className="h-80">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
      )}

      {/* Overall Progress Bar */}
      <div className="mb-8 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Overall Progress
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {roleProgress?.items.filter((i) => i.completed).length || 0} /{' '}
            {roleProgress?.items.length || 0} items
          </span>
        </div>
        <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${roleProgress?.readinessScore || 0}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Skills Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white dark:text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                Skills to Master
              </h4>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {categoryProgress.skills.toFixed(0)}%
            </span>
          </div>
          <div className="space-y-2">
            {data.skills.map((skill, i) => {
              const itemId = `skill-${i}`
              const item = getItemById(itemId)
              const completed = item?.completed || false

              return (
                <label
                  key={i}
                  className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleItem(role, itemId)}
                    className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm font-medium flex-1 transition-all ${
                      completed
                        ? 'text-slate-400 dark:text-slate-500 line-through'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    {skill}
                  </span>
                  {completed && (
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </label>
              )
            })}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white dark:text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                Certifications
              </h4>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {categoryProgress.certifications.toFixed(0)}%
            </span>
          </div>
          <div className="space-y-2">
            {data.certifications.map((cert, i) => {
              const itemId = `cert-${i}`
              const item = getItemById(itemId)
              const completed = item?.completed || false

              return (
                <label
                  key={i}
                  className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleItem(role, itemId)}
                    className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm font-medium flex-1 transition-all ${
                      completed
                        ? 'text-slate-400 dark:text-slate-500 line-through'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    {cert}
                  </span>
                  {completed && (
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </label>
              )
            })}
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 dark:bg-slate-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white dark:text-slate-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                Projects to Build
              </h4>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {categoryProgress.projects.toFixed(0)}%
            </span>
          </div>
          <div className="space-y-2">
            {data.projects.map((project, i) => {
              const itemId = `project-${i}`
              const item = getItemById(itemId)
              const completed = item?.completed || false

              return (
                <label
                  key={i}
                  className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group"
                >
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => toggleItem(role, itemId)}
                    className="mt-0.5 w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                  />
                  <span
                    className={`text-sm font-medium flex-1 transition-all ${
                      completed
                        ? 'text-slate-400 dark:text-slate-500 line-through'
                        : 'text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  >
                    {project}
                  </span>
                  {completed && (
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
