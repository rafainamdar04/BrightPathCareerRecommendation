import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CounterfactualResponse } from '../types/api'
import { TransitionPlanDisplay } from './TransitionPlanDisplay'
import { CounterfactualChangesChart } from './CounterfactualChangesChart'

interface CounterfactualAnalysisProps {
  data: CounterfactualResponse
  onClose?: () => void
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function CounterfactualAnalysis({ data, onClose }: CounterfactualAnalysisProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const feasibilityConfig = {
    High: {
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-700 dark:text-green-300',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
    Moderate: {
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-700 dark:text-yellow-300',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      ),
    },
    Challenging: {
      color: 'from-red-500 to-rose-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-700 dark:text-red-300',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
    },
  }

  const config = feasibilityConfig[data.feasibility]

  const formatFeatureName = (feature: string): string => {
    return feature
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
  }

  const getDirectionIcon = (direction: string) => {
    if (direction === 'increase') {
      return (
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
    return (
      <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  }

  const getImpactBar = (impact: number) => {
    const percentage = Math.min(Math.abs(impact) * 100, 100)
    const colorClass = impact >= 0 
      ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
      : 'bg-gradient-to-r from-purple-400 to-purple-600'
    
    return (
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${colorClass} rounded-full`}
        />
      </div>
    )
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
    >
      {/* Header */}
      <div className="relative bg-gradient-to-r from-primary to-primary-600 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-1">
                  What-If Analysis
                </h2>
                <p className="text-white/90 text-sm">
                  AI-powered counterfactual career transition insights
                </p>
              </div>
            </div>
            {onClose && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>

          {/* Role Transition */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mb-1">Current Role</div>
              <div className="text-white text-lg font-bold">{data.current_role}</div>
            </div>
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.div>
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-xs text-white/70 font-semibold uppercase tracking-wider mb-1">Target Role</div>
              <div className="text-white text-lg font-bold">{data.target_role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Feasibility Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl ${config.bgColor} border ${config.borderColor} mb-8`}
        >
          <svg className={`w-6 h-6 ${config.textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {config.icon}
          </svg>
          <div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Feasibility</div>
            <div className={`text-lg font-bold ${config.textColor}`}>{data.feasibility}</div>
          </div>
        </motion.div>

        {/* Changes Needed */}
        {data.changes_needed.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              You're Already Well-Suited!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your current profile is already well-aligned with the <strong>{data.target_role}</strong> role. 
              You may not need significant changes to transition successfully.
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Changes to Consider
              </h3>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {data.changes_needed.length} {data.changes_needed.length === 1 ? 'area' : 'areas'} identified
              </div>
            </div>

            {/* Use new visualization components */}
            <div className="space-y-6">
              <CounterfactualChangesChart 
                changes={data.changes_needed}
                currentRole={data.current_role}
                targetRole={data.target_role}
              />

              {/* Transition Plan */}
              {data.transition_plan && (
                <TransitionPlanDisplay 
                  plan={data.transition_plan}
                  currentRole={data.current_role}
                  targetRole={data.target_role}
                />
              )}
            </div>
          </>
        )}

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
        >
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <strong className="font-semibold">How this works:</strong> Our AI uses SHAP (SHapley Additive exPlanations) 
              to analyze the difference between your current profile and what's typically needed for the target role. 
              The suggestions above indicate which attributes have the highest impact on making this career transition.
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
