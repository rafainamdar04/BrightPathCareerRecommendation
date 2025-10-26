import { fetchWithTimeout } from '../utils/http'
import type { Top3CareerOutput, RoadmapResponse, XAIResponse, EvolutionResponse } from '../types/api'
import React, { useState, useRef, useEffect } from 'react'
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
import { EnhancedRoadmapDisplay } from '../components/EnhancedRoadmapDisplay'
import { apiUrl } from '../utils/api'
import { SkillGapAnalysis } from '../components/SkillGapAnalysis'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

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

// Animation variants for smooth transitions
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
}

// ==================== DISPLAY COMPONENTS ====================

// Career Evolution Display Component with Professional Timeline
function CareerEvolutionDisplay({ data, role }: { data: any, role: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg"
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Career Evolution Path</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Your personalized career trajectory</p>
        </div>
      </div>

      {/* Future Roles Timeline */}
      <div className="relative">
        {/* Timeline Line */}
  <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-slate-300 dark:via-slate-600 to-transparent" />
        
        <motion.div 
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {data.future_roles && data.future_roles.map((stage: any, i: number) => (
            <motion.div 
              key={i} 
              variants={fadeInUp}
              className="relative pl-20"
            >
              {/* Timeline Node */}
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="absolute left-0 w-14 h-14 rounded-full flex items-center justify-center bg-gradient-primary border-4 border-white dark:border-slate-900 shadow-xl"
              >
                <span className="text-white font-bold text-lg">{stage.stage || i + 1}</span>
              </motion.div>
              
              {/* Stage Card */}
              <motion.div 
                whileHover={{ x: 4, boxShadow: "0 20px 40px rgba(155, 93, 229, 0.15)" }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h5 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{stage.role}</h5>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">{stage.timeframe}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Confidence</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
                      {(stage.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                
                {/* Confidence Bar */}
                <div className="relative w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stage.confidence * 100}%` }}
                    transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary-600 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Career Roadmap Display Component with Visual Graphics
function CareerRoadmapDisplay({ data, role }: { data: any, role: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: -5 }}
          className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg"
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Career Roadmap</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Your path to {role}</p>
        </div>
      </div>

      <motion.div 
        className="grid md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Skills Section */}
        <motion.div 
          variants={fadeInUp}
          className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              whileHover={{ rotate: 20 }}
              className="w-11 h-11 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Skills to Master</h4>
          </div>
          <div className="space-y-2.5">
            {data.skills.map((skill: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(155, 93, 229, 0.1)" }}
                className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 group"
              >
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div 
          variants={fadeInUp}
          className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              whileHover={{ rotate: -20 }}
              className="w-11 h-11 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </motion.div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Certifications</h4>
          </div>
          <div className="space-y-2.5">
            {data.certifications.map((cert: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(155, 93, 229, 0.1)" }}
                className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 group"
              >
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div 
          variants={fadeInUp}
          className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div 
              whileHover={{ rotate: 20 }}
              className="w-11 h-11 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </motion.div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Projects to Build</h4>
          </div>
          <div className="space-y-2.5">
            {data.projects.map((project: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(155, 93, 229, 0.1)" }}
                className="flex items-start gap-3 p-3.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 group"
              >
                <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{project}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// XAI Display Component with Enhanced Visualizations
function XAIDisplay({ data, role, onDownload }: { data: any, role: string, onDownload: (role: string, data: any) => void }) {
  const [showChart, setShowChart] = useState<boolean>(false)
  const [sortMode, setSortMode] = useState<'abs' | 'raw'>('abs')
  const [polarity, setPolarity] = useState<'all' | 'pos' | 'neg'>('all')
  const [topK, setTopK] = useState<number>(10)

  // Prepare chart data from feature contributions (fallback if shap_values is present)
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
    plugins: {
      legend: { display: false },
      tooltip: { 
        enabled: true,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(148, 163, 184, 0.15)' },
        ticks: { 
          callback: (val: any) => `${val}`,
          color: '#94a3b8',
          font: { size: 11 }
        },
      },
    },
  } as const

  const hasExtraImages = data?.visualization_beeswarm || data?.visualization_waterfall

  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800 hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 15 }}
            className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg"
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">XAI Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Explainable AI for {role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChart(!showChart)}
            className="px-4 py-2.5 rounded-xl font-medium border-2 border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300"
          >
            {showChart ? 'Show Image' : 'Interactive Chart'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDownload(role, data)}
            className="flex items-center gap-2 px-5 py-2.5 btn-primary"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </motion.button>
        </div>
      </div>

      {/* DL Badge and explainer */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <div className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          Powered by Deep Learning
        </div>
        <span className="text-xs text-slate-600 dark:text-slate-400">Feature importance is computed with SHAP over the model's outputs to explain why a role was recommended.</span>
      </div>

      {/* Summary */}
      {data.summary && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-primary-600/10 dark:from-primary/10 dark:to-primary/10 rounded-xl border-l-4 border-primary shadow-sm"
        >
          <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-base">{data.summary}</p>
        </motion.div>
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

      {/* SHAP Visualization */}
      {(!showChart && data.visualization) && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/70 rounded-xl p-7 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Feature Importance Visualization</h4>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-5 border border-slate-200 dark:border-slate-700 overflow-hidden">
            <img 
              src={apiUrl(data.visualization)}
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
        </motion.div>
      )}

      {/* ChartJS fallback/alternative with controls */}
      {(showChart || !data.visualization) && labels.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 bg-white dark:bg-slate-900 rounded-xl p-7 border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Feature Importance (Interactive)</h4>
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
          <div style={{ height: '400px' }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </motion.div>
      )}

      {/* Top Factors */}
      {data.top_factors && data.top_factors.length > 0 && (
        <motion.div 
          className="mb-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Top Influencing Factors</h4>
          <div className="grid gap-4">
            {data.top_factors.map((factor: any, i: number) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ x: 4, boxShadow: "0 8px 24px rgba(155, 93, 229, 0.15)" }}
                className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:border-[#9b5de5]/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-base shadow-md ${
                        factor.impact === 'positive' ? 'bg-gradient-to-br from-[#9b5de5] to-[#7b3fb8]' : 'bg-gradient-to-br from-red-500 to-red-600'
                      }`}
                    >
                      {i + 1}
                    </motion.div>
                    <div className="flex-1">
                      <h5 className="font-bold text-slate-900 dark:text-white mb-2 text-base">{factor.feature}</h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{factor.insight}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap ${
                    factor.impact === 'positive' 
                      ? 'bg-[#9b5de5]/10 text-[#9b5de5] dark:bg-[#9b5de5]/20 dark:text-[#b78ef5]' 
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {factor.impact === 'positive' ? '↑' : '↓'} {factor.contribution.toFixed(3)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* LIME Explanation */}
      {data.lime_explanation && data.lime_explanation.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-7 border border-slate-200 dark:border-slate-700"
        >
          <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-5">Detailed Explanations</h4>
          <div className="space-y-3">
            {data.lime_explanation.map((item: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(155, 93, 229, 0.1)" }}
                className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 group"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-[#9b5de5] to-[#7b3fb8] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// ==================== END DISPLAY COMPONENTS ====================

// ==================== COMPARISON VIEW (SIDE-BY-SIDE) ====================
function CompareView({
  roles,
  results,
  formData,
  fetchers,
  showSections
}: {
  roles: string[]
  results: { role: string, confidence_score: number }[]
  formData: any
  fetchers: { roadmap: (role: string, data: any) => Promise<any>, xai: (role: string, data: any) => Promise<any> },
  showSections?: { roadmap?: boolean, xai?: boolean }
}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Record<string, { roadmap?: any, xai?: any }>>({})
  const [showRoadmap, setShowRoadmap] = useState(showSections?.roadmap ?? true)
  const [showXai, setShowXai] = useState(showSections?.xai ?? true)
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
          {(showSections?.roadmap ?? true) && (
            <button
              onClick={() => setShowRoadmap(v => !v)}
              aria-pressed={showRoadmap}
              className={`px-3 py-1.5 text-xs rounded-lg border ${showRoadmap ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
            >
              {showRoadmap ? 'Hide Roadmap' : 'Show Roadmap'}
            </button>
          )}
          {(showSections?.xai ?? true) && (
            <button
              onClick={() => setShowXai(v => !v)}
              aria-pressed={showXai}
              className={`px-3 py-1.5 text-xs rounded-lg border ${showXai ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
            >
              {showXai ? 'Hide XAI' : 'Show XAI'}
            </button>
          )}
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
            {(showSections?.roadmap ?? true) && showRoadmap && d?.roadmap && (
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
            {(showSections?.xai ?? true) && showXai && d?.xai && (
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
      {(showSections?.roadmap ?? true) && d1?.roadmap && d2?.roadmap && (
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
  top3: async (data: any): Promise<Top3CareerOutput> => {
    const res = await fetchWithTimeout(apiUrl('/predict_top3_careers'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  xai: async (role: string, data: any): Promise<XAIResponse> => {
    const res = await fetchWithTimeout(apiUrl(`/xai_explanations/${encodeURIComponent(role)}?generate_visualization=true`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  roadmap: async (role: string, data: any): Promise<RoadmapResponse> => {
    const res = await fetchWithTimeout(apiUrl(`/career_roadmap/${encodeURIComponent(role)}`), { timeoutMs: 20000 })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    return res.json()
  },
  evolution: async (data: any, role?: string): Promise<EvolutionResponse> => {
    const qs = role ? `?role=${encodeURIComponent(role)}` : ''
    const res = await fetchWithTimeout(apiUrl(`/predict_career_evolution${qs}`), {
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
        inputMode="numeric"
        placeholder={`${min}\u2013${max}`}
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
      {options.map(o => (
        <label key={o} className="relative cursor-pointer group block h-full">
          <input
            type="radio"
            name={name}
            value={o as string}
            required
            className="peer sr-only"
          />
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="h-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center font-medium transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-primary/20 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md flex items-center justify-center"
          >
            {o}
          </motion.div>
        </label>
      ))}
    </div>
  )
}

function CheckboxGroup({ name, options }: { name: string, options: readonly string[] | string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
      {options.map(o => (
        <label key={o} className="checkbox-label relative cursor-pointer group block h-full">
          <input
            type="checkbox"
            name={name}
            value={o as string}
            className="checkbox-input peer sr-only"
          />
          <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="checkbox-box h-full px-4 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium transition-all duration-300 peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-lg peer-checked:shadow-primary/20 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md flex items-center justify-between"
          >
            <span>{o}</span>
            <div className="checkbox-icon-container relative w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 peer-checked:bg-gradient-to-br peer-checked:from-primary peer-checked:to-primary-600 peer-checked:border-primary flex items-center justify-center transition-all">
              <svg className="checkbox-icon w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 scale-50 peer-checked:scale-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 16 16" strokeWidth="3">
                <polyline points="3 8 6 11 13 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
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
  const categories = [...new Set(fieldConfig.map(f => f.category))]
  const [step, setStep] = useState(0)
  const totalSteps = categories.length
  const [compareMode, setCompareMode] = useState(false)
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)
  // Futuristic cards and modal state
  const [expanded, setExpanded] = useState<string | null>(null)
  
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

  // categories declared above

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

  // Open inline details instead of modal
  const openInlineDetails = (tab: 'evolution' | 'skillgap' | 'roadmap' | 'xai', role: string) => {
    setSelectedCareer(role)
    setActiveTab(tab)
    fetchDataForTab(tab, role)
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
        data = await api.evolution(formData, targetCareer)
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
          const el = form.elements.namedItem(f.name) as HTMLInputElement | null;
          const num = el && el.value !== undefined ? Number(el.value) : 0;
          formDataObj[f.name] = isNaN(num) ? 0 : num;
      }
    })

    try {
      const data = await api.top3(formDataObj)
      setResults(data.top_predictions)
      setFormData(formDataObj) // Store form data for later API calls
      // Persist context for Insights page
      try {
        localStorage.setItem('careerFormData', JSON.stringify(formDataObj))
        localStorage.setItem('careerResults', JSON.stringify(data.top_predictions || []))
        const top = data.top_predictions?.[0]?.role
        if (top) localStorage.setItem('careerSelectedRole', top)
      } catch {}
      
      // Pass recommended careers to parent for resume analysis
      if (onCareersRecommended && data.top_predictions) {
        onCareersRecommended(data.top_predictions.map((pred: any) => ({
          career: pred.role,
          probability: pred.confidence_score
        })))
      }
      
      // Open Insights in a new tab focused on consolidated analysis
      try {
        const url = new URL(window.location.href)
        url.searchParams.set('page', 'insights')
        const top = data.top_predictions?.[0]?.role
        if (top) url.searchParams.set('role', top)
        window.open(url.toString(), '_blank', 'noopener')
      } catch {
        // Fallback: still scroll to results
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#9b5de5] via-[#7b3fb8] to-[#5b2d98] bg-clip-text text-transparent mb-4 tracking-tight">
            Find Your Best-Fit Career
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Honest, clear guidance based on your strengths—no fluff, just results.
          </p>
        </motion.div>

        {/* Overview: explain tabs until recommendations are ready */}
        {!results && (
          <div className="mb-10">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What you'll see after recommendations</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {[{
                  title: 'Roadmap',
                  desc: 'A curated list of skills, certifications, and projects tailored to each recommended career. You can compare two careers side-by-side.',
                  icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                },{
                  title: 'Evolution',
                  desc: 'Your predicted career trajectory based on your profile (e.g., Software Engineer → Senior → Lead).',
                  icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                },{
                  title: 'XAI',
                  desc: 'Explainable AI insights with visualizations showing which inputs most influenced each recommendation. Compare two careers to see the differences.',
                  icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                },{
                  title: 'Skill Gap',
                  desc: 'Visual analysis of which skills you already have and which to build for a chosen career. Upload your resume for even more accuracy. You can compare two careers too.',
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                }].map(card => (
                  <div key={card.title} className="flex gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#9b5de5] to-[#7b3fb8] flex items-center justify-center text-white shadow">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{card.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

              {/* Results Section */}
          {(!formCollapsed || !results) && (
            <motion.form 
              ref={formRef} 
              onSubmit={onSubmit} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Progress Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full mb-10 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">Step {step + 1} of {totalSteps}</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{categories[step]}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#9b5de5] to-[#7b3fb8] bg-clip-text text-transparent">
                      {Math.round(((step + 1) / totalSteps) * 100)}%
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Complete</p>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#9b5de5] to-[#7b3fb8] rounded-full shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              {/* AI Helper Text */}
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mb-8 text-center"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#9b5de5]/10 dark:bg-[#9b5de5]/5 rounded-full border border-[#9b5de5]/20">
                  <svg className="w-5 h-5 text-[#9b5de5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-[#9b5de5] dark:text-[#b78ef5] text-sm font-medium">
                    {step === 0 && "Our model uses your academic trends to predict optimal technical domains."}
                    {step === 1 && "Your skill ratings help our neural network weigh your logical and creative strengths."}
                    {step === 2 && "Your interests guide our AI to match you with fulfilling roles."}
                    {step === 3 && "Certifications boost your profile in our recommendation engine."}
                    {step === 4 && "Project experience helps our model assess your practical skills."}
                    {step === 5 && "Soft skills and preferences help us personalize your career roadmap."}
                  </p>
                </div>
              </motion.div>

              {/* Step Fields */}
              <motion.div 
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800"
              >
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                  {categories[step]}
                </h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {fieldConfig
                    .filter(f => f.category === categories[step])
                    .map(f => (
                      <motion.div 
                        key={f.name} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-3 relative"
                      >
                        <label className="block text-base font-semibold text-slate-800 dark:text-slate-200">
                          {f.label}
                          {f.type === 'checkbox' && <span className="ml-2 text-xs text-slate-500 dark:text-slate-400 font-normal">(select all that apply)</span>}
                        </label>
                        {f.type === 'number' && <NumberInput name={f.name} min={f.min!} max={f.max!} />}
                        {f.type === 'radio' && <RadioGroup name={f.name} options={f.options!} />}
                        {f.type === 'checkbox' && <CheckboxGroup name={f.name} options={f.options!} />}
                      </motion.div>
                    ))}
                </div>
              </motion.div>

              {/* Step Navigation */}
              <div className="flex justify-between items-center pt-6">
                <motion.button
                  whileHover={{ scale: 1.02, x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="px-8 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
                  disabled={step === 0}
                  onClick={() => setStep(s => Math.max(0, s - 1))}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </div>
                </motion.button>
                {step < totalSteps - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="px-8 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#9b5de5] to-[#7b3fb8] hover:shadow-xl hover:shadow-[#9b5de5]/30 transition-all duration-300"
                    onClick={() => setStep(s => Math.min(totalSteps - 1, s + 1))}
                  >
                    <div className="flex items-center gap-2">
                      Next Step
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="px-10 py-4 text-lg rounded-2xl font-bold text-white bg-gradient-to-r from-[#9b5de5] to-[#7b3fb8] hover:shadow-2xl hover:shadow-[#9b5de5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-3"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        <span>Analyzing Your Profile…</span>
                        <div className="flex gap-1">
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                          <motion.span 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        Get My Career Recommendations
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.form>
          )}
        
              {results && (
                <>
                <motion.div 
                  ref={resultsRef}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-8 md:grid-cols-3 mb-12"
                >
                    {results.map((r, idx) => {
                      const isExpanded = expanded === r.role
                      const gradientColors = [
                        { from: '#9b5de5', to: '#7b3fb8', ring: 'ring-[#9b5de5]/30' },
                        { from: '#10b981', to: '#059669', ring: 'ring-emerald-500/30' },
                        { from: '#6366f1', to: '#4f46e5', ring: 'ring-indigo-500/30' }
                      ]
                      const colors = gradientColors[idx]
                      return (
                        <motion.div
                          key={r.role}
                          variants={fadeInUp}
                          layout
                          whileHover={{ y: -8 }}
                          className="relative group"
                        >
                          <motion.div
                            layout
                            onClick={() => setExpanded(isExpanded ? null : r.role)}
                            className="cursor-pointer rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                            style={{
                              boxShadow: isExpanded ? `0 20px 60px ${colors.from}25` : undefined
                            }}
                          >
                            {/* Subtle gradient background */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300"
                              style={{
                                background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                              }}
                            />

                            {/* Rank Badge */}
                            <div className="absolute top-4 right-4">
                              <motion.div 
                                whileHover={{ rotate: 360, scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-lg"
                                style={{
                                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                                }}
                              >
                                #{idx + 1}
                              </motion.div>
                            </div>

                            {/* Content */}
                            <div className="relative">
                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 pr-12 leading-tight">{r.role}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">AI-powered match analysis</p>
                              
                              {/* Score Display */}
                              <div className="flex items-end gap-3 mb-5">
                                <div className="text-4xl font-extrabold bg-clip-text text-transparent" style={{
                                  backgroundImage: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                                }}>
                                  {(r.confidence_score).toFixed(1)}
                                </div>
                                <div className="text-2xl font-bold text-slate-400 dark:text-slate-600 pb-1">/10</div>
                              </div>

                              {/* Progress Bar */}
                              <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(r.confidence_score / 10) * 100}%` }}
                                  transition={{ duration: 1, delay: idx * 0.2, ease: "easeOut" }}
                                  className="h-full rounded-full shadow-lg"
                                  style={{
                                    background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`
                                  }}
                                />
                              </div>

                              {/* Expand indicator */}
                              <div className="flex items-center justify-center">
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="text-slate-400 dark:text-slate-600"
                                >
                                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </motion.div>
                              </div>
                            </div>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  key="expanded"
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="relative mt-8 pt-8 border-t border-slate-200 dark:border-slate-800"
                                >
                                  <div className="grid grid-cols-2 gap-3">
                                    {([
                                      { key: 'evolution', label: 'Evolution', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                                      { key: 'skillgap', label: 'Skills', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                                      { key: 'roadmap', label: 'Roadmap', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
                                      { key: 'xai', label: 'Insights', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                                    ] as const).map((btn) => (
                                      <motion.button
                                        key={btn.key}
                                        whileHover={{ scale: 1.03, y: -2 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={(e) => { e.stopPropagation(); openInlineDetails(btn.key, r.role) }}
                                        className="relative overflow-hidden rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 px-4 py-4 text-left transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700"
                                        style={{
                                          boxShadow: `0 4px 12px ${colors.from}15`
                                        }}
                                      >
                                        <div className="flex items-center gap-3">
                                          <div 
                                            className="w-9 h-9 rounded-lg flex items-center justify-center shadow-sm"
                                            style={{
                                              background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                                            }}
                                          >
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={btn.icon} />
                                            </svg>
                                          </div>
                                          <span className="text-sm font-bold text-slate-900 dark:text-white">{btn.label}</span>
                                        </div>
                                      </motion.button>
                                    ))}
                                  </div>
                                  {/* Compare toggle */}
                                  <div className="mt-4 flex items-center justify-between">
                                    <button
                                      onClick={(e) => { e.stopPropagation(); toggleCompare(r.role) }}
                                      className={`px-3 py-2 text-xs rounded-lg border ${selectedForCompare.includes(r.role) ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-600' : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                                    >
                                      {selectedForCompare.includes(r.role) ? 'Selected for Compare' : 'Add to Compare'}
                                    </button>
                                    {selectedForCompare.length > 0 && (
                                      <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {selectedForCompare.length}/2 selected for comparison
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </motion.div>
                      )
                    })}
              </motion.div>

              {/* Neural Network Architecture Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <ModelArchitectureDisplay />
              </motion.div>

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
                      const rec = results!.find(r => r.role === role)
                      if (!rec) return null
                      const rankIdx = results!.indexOf(rec)
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
                  <CompareView roles={selectedForCompare} results={results!} formData={formData} fetchers={{ roadmap: api.roadmap, xai: api.xai }} />
                </div>
              )}
                </>
          )}

        {/* Selected Career Details with Tabs - hidden when modal open to avoid duplicate */}
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
                    {/* Evolution (note: same for all roles based on profile) */}
                    {activeTab === 'evolution' && careerDetails.evolution && (
                      <CareerEvolutionDisplay data={careerDetails.evolution} role={selectedCareer} />
                    )}
                    {activeTab === 'roadmap' && (
                      selectedForCompare.length === 2 ? (
                        <CompareView roles={selectedForCompare} results={results!} formData={formData} fetchers={{ roadmap: api.roadmap, xai: api.xai }} showSections={{ roadmap: true, xai: false }} />
                      ) : (
                        careerDetails.roadmap && (
                          <EnhancedRoadmapDisplay data={careerDetails.roadmap} role={selectedCareer} />
                        )
                      )
                    )}
                    {activeTab === 'skillgap' && (
                      selectedForCompare.length === 2 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Compute two skill gap panels side by side by fetching roadmaps if needed */}
                          {selectedForCompare.map((role) => (
                            <div key={role} className="col">
                              {/* If the selected role is the one in details and roadmap loaded, use it; else fetch on the fly via a small wrapper */}
                              {role === selectedCareer && careerDetails.roadmap ? (
                                <SkillGapAnalysis roadmapSkills={careerDetails.roadmap.skills || []} formData={formData} role={role} />
                              ) : (
                                <AsyncSkillGap role={role} formData={formData} fetchRoadmap={api.roadmap} />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        careerDetails.roadmap && formData && (
                          <SkillGapAnalysis 
                            roadmapSkills={careerDetails.roadmap.skills || []} 
                            formData={formData} 
                            role={selectedCareer} 
                          />
                        )
                      )
                    )}
                    {activeTab === 'xai' && (
                      selectedForCompare.length === 2 ? (
                        <CompareView roles={selectedForCompare} results={results!} formData={formData} fetchers={{ roadmap: api.roadmap, xai: api.xai }} showSections={{ roadmap: false, xai: true }} />
                      ) : (
                        careerDetails.xai && (
                          <XAIDisplay data={careerDetails.xai} role={selectedCareer} onDownload={downloadXAIReport} />
                        )
                      )
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
        </div>
      </div>

      {/* No modal: insights are inline in the page tabs above */}
    </div>
  )
}

// Async wrapper to fetch roadmap and render SkillGapAnalysis for a role
function AsyncSkillGap({ role, formData, fetchRoadmap }: { role: string, formData: any, fetchRoadmap: (role: string, data: any) => Promise<any> }) {
  const [skills, setSkills] = React.useState<string[] | null>(null)
  const [err, setErr] = React.useState<string | null>(null)
  React.useEffect(() => {
    let cancelled = false
    fetchRoadmap(role, formData).then(rm => {
      if (!cancelled) setSkills(rm.skills || [])
    }).catch(e => { if (!cancelled) setErr(e?.message || 'Failed to load roadmap') })
    return () => { cancelled = true }
  }, [role])
  if (err) return <div className="p-4 text-sm text-red-600 dark:text-red-400">{err}</div>
  if (!skills) return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="w-8 h-8 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-slate-900 dark:border-t-slate-100 animate-spin" />
      <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">Loading skill gap…</p>
    </div>
  )
  return <SkillGapAnalysis roadmapSkills={skills} formData={formData} role={role} />
}
        

