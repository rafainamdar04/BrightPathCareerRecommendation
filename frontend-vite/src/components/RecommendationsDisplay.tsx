import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ImprovementRecommendation } from '../types/api'

interface RecommendationsDisplayProps {
  recommendations: ImprovementRecommendation[]
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export function RecommendationsDisplay({ recommendations }: RecommendationsDisplayProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'High':
        return {
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-300',
          badgeColor: 'bg-gradient-to-r from-red-500 to-rose-600',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        }
      case 'Medium':
        return {
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          badgeColor: 'bg-gradient-to-r from-yellow-500 to-amber-600',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      case 'Low':
        return {
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          textColor: 'text-blue-700 dark:text-blue-300',
          badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-600',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        }
      default:
        return {
          bgColor: 'bg-slate-50 dark:bg-slate-900/20',
          borderColor: 'border-slate-200 dark:border-slate-800',
          textColor: 'text-slate-700 dark:text-slate-300',
          badgeColor: 'bg-gradient-to-r from-slate-500 to-slate-600',
          icon: null
        }
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
            Personalized Recommendations
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            AI-powered insights to boost your career potential
          </p>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const config = getPriorityConfig(rec.priority)
          const isExpanded = expandedIndex === index

          return (
            <motion.div
              key={index}
              custom={index}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className={`
                border-2 rounded-xl overflow-hidden transition-all duration-300
                ${config.borderColor} ${config.bgColor}
                hover:shadow-lg
              `}
            >
              {/* Card Header - Always Visible */}
              <div
                onClick={() => toggleExpand(index)}
                className="p-5 cursor-pointer select-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Priority Badge */}
                    <div className={`
                      ${config.badgeColor} 
                      px-4 py-2 rounded-full shadow-md flex items-center space-x-2
                      text-white font-semibold text-sm
                    `}>
                      {config.icon}
                      <span>{rec.priority}</span>
                    </div>

                    {/* Area & Timeline */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {rec.area}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm">
                        <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-slate-600 dark:text-slate-400 font-medium">
                          Timeline: {rec.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <motion.button
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </div>
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-2 space-y-4 border-t-2 border-slate-200 dark:border-slate-700">
                      {/* Action */}
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                          <h5 className="font-semibold text-slate-900 dark:text-white">
                            Action Plan
                          </h5>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-7">
                          {rec.action}
                        </p>
                      </div>

                      {/* Resources */}
                      {rec.resources && rec.resources.length > 0 && (
                        <div>
                          <div className="flex items-center space-x-2 mb-3">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <h5 className="font-semibold text-slate-900 dark:text-white">
                              Recommended Resources
                            </h5>
                          </div>
                          <div className="flex flex-wrap gap-2 pl-7">
                            {rec.resources.map((resource, idx) => (
                              <motion.a
                                key={idx}
                                href={resource.startsWith('http') ? resource : `https://www.google.com/search?q=${encodeURIComponent(resource)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="
                                  inline-flex items-center space-x-2 px-4 py-2
                                  bg-white dark:bg-slate-800 
                                  border-2 border-slate-300 dark:border-slate-600
                                  rounded-lg shadow-sm
                                  hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-400
                                  transition-all duration-200
                                  text-sm font-medium text-slate-700 dark:text-slate-300
                                  hover:text-indigo-600 dark:hover:text-indigo-400
                                "
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span>{resource}</span>
                              </motion.a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
