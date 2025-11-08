import React from 'react'
import { motion } from 'framer-motion'
import type { ConfidenceInfo } from '../types/api'

interface ConfidenceGaugeProps {
  confidence: ConfidenceInfo
}

export function ConfidenceGauge({ confidence }: ConfidenceGaugeProps) {
  if (!confidence) {
    return null
  }

  const score = confidence.confidence_score * 100
  const level = confidence.confidence_level

  const getLevelConfig = (level: string) => {
    switch (level) {
      case 'Very High':
        return {
          color: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          textColor: 'text-green-700 dark:text-green-300',
          ringColor: 'stroke-green-500',
          minDegree: 270,
          maxDegree: 360,
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          )
        }
      case 'High':
        return {
          color: 'from-blue-500 to-cyan-600',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          textColor: 'text-blue-700 dark:text-blue-300',
          ringColor: 'stroke-blue-500',
          minDegree: 180,
          maxDegree: 270,
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          )
        }
      case 'Moderate':
        return {
          color: 'from-yellow-500 to-orange-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          ringColor: 'stroke-yellow-500',
          minDegree: 90,
          maxDegree: 180,
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          )
        }
      case 'Low':
        return {
          color: 'from-red-500 to-rose-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          textColor: 'text-red-700 dark:text-red-300',
          ringColor: 'stroke-red-500',
          minDegree: 0,
          maxDegree: 90,
          icon: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          )
        }
      default:
        return {
          color: 'from-slate-500 to-slate-600',
          bgColor: 'bg-slate-50 dark:bg-slate-900/20',
          textColor: 'text-slate-700 dark:text-slate-300',
          ringColor: 'stroke-slate-500',
          minDegree: 0,
          maxDegree: 180,
          icon: null
        }
    }
  }

  const config = getLevelConfig(level)

  // Calculate rotation for the gauge (0-180 degrees for semi-circle)
  const rotation = (score / 100) * 180

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${config.bgColor} rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-lg`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-gradient-to-r ${config.color} rounded-lg shadow-md`}>
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {config.icon}
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Prediction Confidence
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Model certainty level
            </p>
          </div>
        </div>
      </div>

      {/* Gauge */}
      <div className="relative flex items-center justify-center mb-6">
        <svg className="w-64 h-32" viewBox="0 0 200 100">
          {/* Background Arc */}
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-200 dark:text-slate-700"
            strokeLinecap="round"
          />
          
          {/* Colored Arc */}
          <motion.path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            strokeWidth="12"
            strokeLinecap="round"
            className={config.ringColor}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: score / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: '251.2',
              strokeDashoffset: 251.2 * (1 - score / 100)
            }}
          />

          {/* Needle */}
          <motion.line
            x1="100"
            y1="90"
            x2="100"
            y2="30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-slate-700 dark:text-slate-300"
            initial={{ rotate: -90 }}
            animate={{ rotate: rotation - 90 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: '100px 90px' }}
          />
          
          {/* Center Dot */}
          <circle cx="100" cy="90" r="5" className="fill-slate-700 dark:fill-slate-300" />
        </svg>

        {/* Score Display */}
        <div className="absolute bottom-0 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5, type: "spring" }}
            className={`text-4xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}
          >
            {score.toFixed(1)}%
          </motion.div>
        </div>
      </div>

      {/* Level Badge */}
      <div className="flex justify-center mb-4">
        <div className={`
          inline-flex items-center space-x-2 px-6 py-3 rounded-full
          bg-gradient-to-r ${config.color}
          text-white font-bold text-lg shadow-lg
        `}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {config.icon}
          </svg>
          <span>{level}</span>
        </div>
      </div>

      {/* Level Scale */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-red-600 dark:text-red-400">Low</span>
          <span className="text-yellow-600 dark:text-yellow-400">Moderate</span>
          <span className="text-blue-600 dark:text-blue-400">High</span>
          <span className="text-green-600 dark:text-green-400">Very High</span>
        </div>
        <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-blue-500 to-green-500 rounded-full"></div>
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
          <span>0%</span>
          <span>40%</span>
          <span>60%</span>
          <span>80%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Top Predictions */}
      {confidence.probability_distribution && confidence.probability_distribution.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
            Top Predictions
          </h4>
          <div className="space-y-2">
            {confidence.probability_distribution.slice(0, 3).map((pred, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + idx * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {idx === 0 && '🥇 '}
                  {idx === 1 && '🥈 '}
                  {idx === 2 && '🥉 '}
                  Career #{pred.career}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pred.probability * 100}%` }}
                      transition={{ duration: 0.8, delay: 1.5 + idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 w-12 text-right tabular-nums">
                    {(pred.probability * 100).toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
