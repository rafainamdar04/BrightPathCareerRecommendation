import React, { useEffect, useState } from 'react'
import { analyzeSkillGap, extractUserSkills, SkillGapResult } from '../utils/skillGapAnalysis'

interface SkillGapAnalysisProps {
  roadmapSkills: string[]
  formData: any
  role: string
}

interface ParsedResume {
  skills: {
    programming_languages: string[]
    frameworks: string[]
    databases: string[]
    cloud_technologies: string[]
    soft_skills: string[]
    other: string[]
  }
}

export function SkillGapAnalysis({ roadmapSkills, formData, role }: SkillGapAnalysisProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [useResume, setUseResume] = useState(false)
  const [resumeAnalysis, setResumeAnalysis] = useState<SkillGapResult | null>(null)

  // Always generate form-based analysis
  const userSkills = extractUserSkills(formData)
  const formAnalysis = analyzeSkillGap(userSkills, roadmapSkills)
  
  // Use resume analysis if available and toggle is on, otherwise use form analysis
  const analysis = useResume && resumeAnalysis ? resumeAnalysis : formAnalysis

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!validTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, DOCX, or TXT file')
        return
      }
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUploadResume = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)

      const response = await fetch('http://localhost:8000/upload_resume', {
        method: 'POST',
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error('Failed to parse resume')
      }

      const data = await response.json()
      const parsedResume: ParsedResume = data.parsed_data

      // Extract all skills from the resume
      const resumeSkills = [
        ...parsedResume.skills.programming_languages,
        ...parsedResume.skills.frameworks,
        ...parsedResume.skills.databases,
        ...parsedResume.skills.cloud_technologies,
        ...parsedResume.skills.soft_skills,
        ...parsedResume.skills.other,
      ]

      // Analyze skill gap using resume skills
      const result = analyzeSkillGap(resumeSkills, roadmapSkills)
      setResumeAnalysis(result)
    } catch (err: any) {
      setError(err.message || 'Failed to parse resume')
    } finally {
      setUploading(false)
    }
  }

  if (!analysis) return null

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 60) return 'text-blue-600 dark:text-blue-400'
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-orange-600 dark:text-orange-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-green-500'
    if (score >= 60) return 'from-blue-500 to-indigo-500'
    if (score >= 40) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  return (
    <div className="mb-8 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-8 border border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
            Skill Gap Analysis
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            AI-powered alignment score for {role}
          </p>
        </div>
      </div>

      {/* Resume Upload Section */}
  <div className="mb-8 p-6 bg-gradient-to-br from-primary/10 to-primary-600/10 dark:from-primary/10 dark:to-primary/10 rounded-xl border border-primary/30 dark:border-primary/30">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            Upload Your Resume for Accurate Analysis
          </h4>
        </div>
  <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
          Get a more accurate skill gap analysis by uploading your resume. We'll extract your skills and compare them with the requirements for {role}.
        </p>
        
        {/* Toggle */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setUseResume(!useResume)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              useResume ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                useResume ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {useResume ? 'Using resume for analysis' : 'Using form data for analysis'}
          </span>
        </div>

        {useResume && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3">
              <label className="relative cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading}
                />
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-primary/30 dark:border-primary/30 hover:border-primary dark:hover:border-primary transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {file ? file.name : 'Choose a file or drag it here'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      PDF, DOCX, or TXT (Max 10MB)
                    </p>
                  </div>
                </div>
              </label>

              <button
                onClick={handleUploadResume}
                disabled={!file || uploading}
                className="w-full px-6 py-3 btn-primary font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Analyzing Resume...
                  </span>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alignment Score - Big Display */}
      <div className="mb-8 p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide">
          Your Alignment Score
        </p>
        <div className="relative inline-block">
          <svg className="w-40 h-40" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-200 dark:text-slate-700"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${(analysis.alignmentScore / 100) * 440} 440`}
              transform="rotate(-90 80 80)"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  className={analysis.alignmentScore >= 80 ? 'stop-emerald-500' : 'stop-orange-500'}
                />
                <stop
                  offset="100%"
                  className={analysis.alignmentScore >= 80 ? 'stop-green-500' : 'stop-red-500'}
                />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className={`text-5xl font-bold ${getScoreColor(analysis.alignmentScore)}`}>
                {analysis.alignmentScore}%
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">aligned</p>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 max-w-md mx-auto">
          {analysis.alignmentScore >= 80 && "Excellent match! You're well-prepared for this role."}
          {analysis.alignmentScore >= 60 &&
            analysis.alignmentScore < 80 &&
            "Good foundation! Focus on key gaps to strengthen your profile."}
          {analysis.alignmentScore >= 40 &&
            analysis.alignmentScore < 60 &&
            'Moderate alignment. Upskilling will significantly boost your competitiveness.'}
          {analysis.alignmentScore < 40 &&
            'Strong potential! Focus on building core skills for this role.'}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Est. time to close gap: {analysis.timeEstimate}
          </span>
        </div>
      </div>

      {/* Two-Column Layout: Matched vs Missing */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Matched Skills */}
        <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h4 className="text-lg font-semibold text-emerald-900 dark:text-emerald-300">
              Skills You Have
            </h4>
            <span className="ml-auto px-2 py-1 text-xs font-bold bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-200 rounded-full">
              {analysis.matchedSkills.length}
            </span>
          </div>
          <div className="space-y-2">
            {analysis.matchedSkills.length > 0 ? (
              analysis.matchedSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg"
                >
                  <svg
                    className="w-4 h-4 text-emerald-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                No matching skills found. Focus on building the required skills.
              </p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="bg-orange-50 dark:bg-orange-900/10 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-4">
            <svg
              className="w-6 h-6 text-orange-600 dark:text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-300">
              Skills to Learn
            </h4>
            <span className="ml-auto px-2 py-1 text-xs font-bold bg-orange-200 dark:bg-orange-800 text-orange-900 dark:text-orange-200 rounded-full">
              {analysis.missingSkills.length}
            </span>
          </div>
          <div className="space-y-2">
            {analysis.missingSkills.length > 0 ? (
              analysis.missingSkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg"
                >
                  <svg
                    className="w-4 h-4 text-orange-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{skill}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                🎉 You have all required skills! Focus on demonstrating them through projects.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
  <div className="mb-6 bg-gradient-to-r from-primary/10 to-primary-600/10 dark:from-primary/10 dark:to-primary/10 rounded-lg p-6 border border-primary/30 dark:border-primary/30">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-6 h-6 text-primary"
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
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            AI Recommendations
          </h4>
        </div>
        <div className="space-y-3">
          {analysis.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg">
              <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps - Action Plan */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Your Action Plan</h4>
        </div>
        <div className="space-y-2">
          {analysis.nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-md transition-shadow">
              <svg
                className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <p className="text-sm text-slate-700 dark:text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
