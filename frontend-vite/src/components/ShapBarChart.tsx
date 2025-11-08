import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface ShapBarChartProps {
  shapValues: Record<string, number>
  maxFeatures?: number
}

export function ShapBarChart({ shapValues, maxFeatures = 10 }: ShapBarChartProps) {
  const chartData = useMemo(() => {
    // Helper function to make feature names more readable
    const formatFeatureName = (feature: string): string => {
      // Remove common prefixes
      let cleaned = feature
        .replace(/^(num_|cat_|encoded_)/gi, '')
        .replace(/_/g, ' ')
      
      // Handle specific cases
      const specialCases: Record<string, string> = {
        'operating systems': 'Operating Systems',
        'algorithms': 'Algorithm Knowledge',
        'databases': 'Database Skills',
        'software engineering': 'Software Engineering',
        'machine learning': 'Machine Learning',
        'coding skills rating': 'Coding Proficiency',
        'self learning capability': 'Self-Learning Ability',
        'extra courses did': 'Additional Courses',
        'management or technical': 'Career Track',
        'worked in teams ever': 'Team Experience',
        'introvert': 'Personality Type'
      }
      
      // Check for exact match
      const lowerCleaned = cleaned.toLowerCase()
      if (specialCases[lowerCleaned]) {
        return specialCases[lowerCleaned]
      }
      
      // Capitalize first letter of each word
      return cleaned.replace(/\b\w/g, c => c.toUpperCase())
    }

    // Sort by absolute value and take top features
    const sorted = Object.entries(shapValues)
      .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
      .slice(0, maxFeatures)

    // Calculate max absolute value for scaling
    const maxAbs = Math.max(...sorted.map(([, val]) => Math.abs(val)))

    return sorted.map(([feature, value]) => ({
      feature: formatFeatureName(feature),
      originalFeature: feature,
      value,
      percentage: (Math.abs(value) / maxAbs) * 100,
      isPositive: value >= 0
    }))
  }, [shapValues, maxFeatures])

  if (chartData.length === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      {/* Chart */}
      <div className="space-y-3">
        {chartData.map((item, idx) => (
          <motion.div
            key={item.feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.04, duration: 0.3 }}
            className="relative"
          >
            {/* Feature Name */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate pr-4">
                {item.feature}
              </span>
              <span className={`
                text-sm font-bold tabular-nums
                ${item.isPositive 
                  ? 'text-emerald-600 dark:text-emerald-400' 
                  : 'text-amber-600 dark:text-amber-400'
                }
              `}>
                {item.value >= 0 ? '+' : ''}{item.value.toFixed(3)}
              </span>
            </div>

            {/* Bar */}
            <div className="relative h-7 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.7, delay: idx * 0.04, ease: "easeOut" }}
                className={`
                  h-full rounded-lg
                  ${item.isPositive
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                    : 'bg-gradient-to-r from-amber-400 to-amber-600'
                  }
                `}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {chartData.filter(d => d.isPositive).length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Positive Factors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {chartData.filter(d => !d.isPositive).length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Negative Factors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {chartData.length}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">Total Features</div>
          </div>
        </div>
      </div>
    </div>
  )
}
