import React from 'react'
import { motion } from 'framer-motion'
import type { CounterfactualChange } from '../types/api'

interface CounterfactualChangesChartProps {
  changes: CounterfactualChange[]
  currentRole: string
  targetRole: string
}

export function CounterfactualChangesChart({ changes, currentRole, targetRole }: CounterfactualChangesChartProps) {
  if (!changes || changes.length === 0) {
    return null
  }

  const formatFeatureName = (feature: string): string => {
    return feature
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
  }

  const getDirectionConfig = (direction: string) => {
    if (direction === 'increase') {
      return {
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        ),
        color: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        textColor: 'text-blue-700 dark:text-blue-300',
        label: 'Increase'
      }
    }
    return {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      label: 'Change'
    }
  }

  // Calculate max impact for scaling
  const maxImpact = Math.max(...changes.map(c => Math.abs(c.impact_difference)))

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Required Changes Analysis
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Comparison: {currentRole} → {targetRole}
          </p>
        </div>
      </div>

      {/* Changes List */}
      <div className="space-y-6">
        {changes.map((change, idx) => {
          const directionConfig = getDirectionConfig(change.direction)
          const impactPercentage = (Math.abs(change.impact_difference) / maxImpact) * 100

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`
                border-2 rounded-xl p-5
                ${directionConfig.bgColor} 
                border-slate-200 dark:border-slate-700
                hover:shadow-lg transition-shadow duration-200
              `}
            >
              {/* Feature Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {formatFeatureName(change.feature)}
                    </h4>
                    <div className={`
                      flex items-center space-x-1 px-3 py-1 rounded-full
                      bg-gradient-to-r ${directionConfig.color}
                      text-white text-xs font-semibold shadow-md
                    `}>
                      {directionConfig.icon}
                      <span>{directionConfig.label}</span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Current: <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {change.current_value}
                    </span>
                  </div>
                </div>
                
                {/* Impact Score */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {Math.abs(change.impact_difference).toFixed(3)}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Impact Score
                  </div>
                </div>
              </div>

              {/* Impact Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <span>Impact Magnitude</span>
                  <span>{impactPercentage.toFixed(0)}%</span>
                </div>
                <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${impactPercentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${directionConfig.color} rounded-full`}
                  />
                </div>
              </div>

              {/* Suggestion */}
              <div className="flex items-start space-x-2 p-3 bg-white dark:bg-slate-800 rounded-lg">
                <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {change.suggestion}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {changes.length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Changes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {changes.filter(c => c.direction === 'increase').length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">To Increase</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {changes.filter(c => c.direction === 'change').length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">To Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {(changes.reduce((sum, c) => sum + Math.abs(c.impact_difference), 0) / changes.length).toFixed(3)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Avg Impact</div>
          </div>
        </div>
      </div>
    </div>
  )
}
