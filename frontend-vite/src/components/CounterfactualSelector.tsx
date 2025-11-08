import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CounterfactualAnalysis } from './CounterfactualAnalysis'
import type { CounterfactualResponse } from '../types/api'
import { apiUrl } from '../utils/api'
import { fetchWithTimeout } from '../utils/http'

interface CounterfactualSelectorProps {
  currentRole: string
  userProfile: any
  availableRoles?: string[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function CounterfactualSelector({ currentRole, userProfile, availableRoles }: CounterfactualSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [counterfactualData, setCounterfactualData] = useState<CounterfactualResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allRoles, setAllRoles] = useState<string[]>([])

  // Fetch all available roles from model architecture
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        if (availableRoles && availableRoles.length > 0) {
          setAllRoles(availableRoles)
        } else {
          const res = await fetchWithTimeout(apiUrl('/model_architecture'))
          if (res.ok) {
            const data = await res.json()
            // Use career_roles field from backend response
            if (data.career_roles && Array.isArray(data.career_roles)) {
              setAllRoles(data.career_roles)
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch roles:', err)
      }
    }
    fetchRoles()
  }, [availableRoles])

  const analyzeTransition = async () => {
    if (!selectedRole) return

    setLoading(true)
    setError(null)
    setCounterfactualData(null)

    try {
      // Counterfactual with AI transition plan can take longer (SHAP + LLM)
      // Use a generous timeout and one retry on abort
      const makeRequest = (timeoutMs: number) => fetchWithTimeout(
        apiUrl(`/xai_counterfactual/${encodeURIComponent(selectedRole)}?max_changes=5`),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userProfile),
          timeoutMs,
        }
      )

      let res: Response
      try {
        res = await makeRequest(45000)
      } catch (e: any) {
        // Retry once if it was aborted (timeout)
        if (e?.name === 'AbortError') {
          console.warn('Counterfactual request timed out, retrying with longer timeout...')
          res = await makeRequest(60000)
        } else {
          throw e
        }
      }

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()
      setCounterfactualData(data)
    } catch (err: any) {
      // Distinguish abort vs generic error
      if (err?.name === 'AbortError') {
        setError('Request aborted (timeout). The analysis took too long. Please retry or choose fewer changes.')
      } else {
        setError(err?.message || 'Failed to analyze transition')
      }
      console.error('[CounterfactualSelector] Transition analysis error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter out the current role from selection
  const selectableRoles = allRoles.filter(role => role !== currentRole).sort()

  return (
    <div className="space-y-6">
      {/* Role Selector */}
      {!counterfactualData && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Explore Career Transition
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Select a target career to see what needs to change
              </p>
            </div>
          </div>

          {/* Current Role Display */}
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">
              Your Current Predicted Role
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {currentRole}
            </div>
          </div>

          {/* Target Role Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Select Target Career Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="">-- Choose a career to explore --</option>
                {selectableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={analyzeTransition}
            disabled={!selectedRole || loading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
              !selectedRole || loading
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary to-primary-600 hover:shadow-xl hover:shadow-primary/30'
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing Transition...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span>Analyze Transition Path</span>
              </div>
            )}
          </motion.button>

          {/* Helper Text */}
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <strong className="font-semibold">Pro Tip:</strong> Try analyzing multiple career transitions to compare which path is most feasible from your current profile.
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800"
            >
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-red-900 dark:text-red-100">
                  <strong className="font-semibold">Error:</strong> {error}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Counterfactual Analysis Results */}
      <AnimatePresence mode="wait">
        {counterfactualData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <CounterfactualAnalysis 
              data={counterfactualData}
              onClose={() => {
                setCounterfactualData(null)
                setSelectedRole('')
                setError(null)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
