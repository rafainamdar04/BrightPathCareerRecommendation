import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { TransitionPlan } from '../types/api'

interface TransitionPlanDisplayProps {
  plan: TransitionPlan
  currentRole: string
  targetRole: string
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

export function TransitionPlanDisplay({ plan, currentRole, targetRole }: TransitionPlanDisplayProps) {
  const [activeTab, setActiveTab] = useState<'short' | 'medium' | 'long'>('short')

  if (!plan) {
    return null
  }

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return {
          color: 'from-green-500 to-emerald-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          textColor: 'text-green-700 dark:text-green-300',
          gauge: 33
        }
      case 'Moderate':
        return {
          color: 'from-yellow-500 to-orange-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          gauge: 66
        }
      case 'Challenging':
        return {
          color: 'from-red-500 to-rose-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          textColor: 'text-red-700 dark:text-red-300',
          gauge: 100
        }
      default:
        return {
          color: 'from-slate-500 to-slate-600',
          bgColor: 'bg-slate-50 dark:bg-slate-900/20',
          textColor: 'text-slate-700 dark:text-slate-300',
          gauge: 50
        }
    }
  }

  const difficultyConfig = getDifficultyConfig(plan.difficulty)

  const tabs = [
    {
      id: 'short' as const,
      label: 'Short-term',
      subtitle: '0-3 months',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      items: plan.short_term,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'medium' as const,
      label: 'Medium-term',
      subtitle: '3-9 months',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      items: plan.medium_term,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'long' as const,
      label: 'Long-term',
      subtitle: '9-18 months',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      items: plan.long_term,
      color: 'from-pink-500 to-rose-600'
    }
  ]

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Career Transition Roadmap</h3>
              <p className="text-white/80 text-sm">
                {currentRole} → {targetRole}
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-white/90 leading-relaxed mb-4">
          {plan.transition_summary}
        </p>

        {/* Difficulty & Timeline Badges */}
        <div className="flex flex-wrap gap-3">
          <div className={`
            inline-flex items-center space-x-2 px-4 py-2 rounded-full
            bg-white/20 backdrop-blur-sm
            text-white font-semibold
          `}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Difficulty: {plan.difficulty}</span>
          </div>
          <div className={`
            inline-flex items-center space-x-2 px-4 py-2 rounded-full
            bg-white/20 backdrop-blur-sm
            text-white font-semibold
          `}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Timeline: {plan.estimated_timeline}</span>
          </div>
        </div>
      </motion.div>

      {/* Difficulty Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className={`${difficultyConfig.bgColor} rounded-xl p-6 border-2 border-slate-200 dark:border-slate-700`}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-slate-900 dark:text-white">Transition Difficulty</h4>
          <span className={`font-bold ${difficultyConfig.textColor}`}>{plan.difficulty}</span>
        </div>
        <div className="relative h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${difficultyConfig.gauge}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className={`h-full bg-gradient-to-r ${difficultyConfig.color} rounded-full`}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mt-2">
          <span>Easy</span>
          <span>Moderate</span>
          <span>Challenging</span>
        </div>
      </motion.div>

      {/* Timeline Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 px-6 py-4 font-semibold transition-all duration-300
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r ' + tab.color + ' text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }
              `}
            >
              <div className="flex items-center justify-center space-x-2">
                {tab.icon}
                <div className="text-left">
                  <div className="text-sm font-bold">{tab.label}</div>
                  <div className="text-xs opacity-80">{tab.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTabData && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
                {activeTabData.icon}
                <span>{activeTabData.label} Actions</span>
              </h4>
              <ul className="space-y-3">
                {activeTabData.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start space-x-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className={`
                      p-2 rounded-full bg-gradient-to-r ${activeTabData.color} 
                      text-white font-bold text-sm min-w-[32px] h-8 flex items-center justify-center
                    `}>
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                      {item}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      {/* Key Skills */}
      {plan.key_skills && plan.key_skills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">
              Key Skills to Master
            </h4>
          </div>
          <div className="flex flex-wrap gap-3">
            {plan.key_skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
                className="
                  px-4 py-2 rounded-full
                  bg-gradient-to-r from-emerald-500 to-teal-600
                  text-white font-semibold text-sm shadow-md
                  hover:shadow-lg hover:scale-105 transition-all duration-200
                "
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Success Tips */}
      {plan.success_tips && plan.success_tips.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {plan.success_tips.map((tip, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="
                bg-gradient-to-br from-amber-50 to-orange-50 
                dark:from-amber-900/20 dark:to-orange-900/20
                rounded-xl p-5 border-2 border-amber-200 dark:border-amber-800
                hover:shadow-lg transition-shadow duration-200
              "
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">
                    Success Tip #{idx + 1}
                  </h5>
                  <p className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                    {tip}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
