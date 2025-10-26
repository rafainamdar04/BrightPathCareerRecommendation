import React from 'react'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center animate-fadeIn mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white sm:text-6xl md:text-7xl animate-slideDown">
            <span className="block">Welcome to</span>
            <span className="block text-gradient bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">BrightPath</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 animate-slideUp animation-delay-200">
            Find roles where you’ll thrive. We’ll match your strengths with career paths that fit—clearly and confidently.
          </p>
          <div className="mt-8">
            <button onClick={onGetStarted} className="btn-primary px-8 py-4 text-lg">
              Start Your Journey Now
            </button>
          </div>
        </div>

        {/* Pipeline Visual */}
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How BrightPath Works</h2>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-2 shadow-lg">
                <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="12" fill="#fff" /></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Your Input</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Skills, interests, academics, resume</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-2 shadow-lg">
                <svg width="32" height="32" fill="none"><rect x="8" y="8" width="16" height="16" rx="8" fill="#fff" /></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Deep Learning Model</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Finds patterns, predicts best careers</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-2 shadow-lg">
                <svg width="32" height="32" fill="none"><polygon points="16,4 28,28 4,28" fill="#fff" /></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Career Recommendations</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Top 3 matches, confidence scores</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-2 shadow-lg">
                <svg width="32" height="32" fill="none"><ellipse cx="16" cy="16" rx="12" ry="8" fill="#fff" /></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">NLP Resume Parsing</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Extracts skills, experience, achievements</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center mb-2 shadow-lg">
                <svg width="32" height="32" fill="none"><rect x="10" y="10" width="12" height="12" rx="6" fill="#fff" /></svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">XAI Transparency</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Explains why each career was recommended</span>
            </div>
          </div>
        </div>

        {/* About Section - Only keep Mission, What Sets Us Apart, Why BrightPath */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300">
              BrightPath empowers you with intelligent, data-driven career recommendations tailored to your unique profile. We believe everyone deserves clear, actionable guidance for their future.
            </p>
          </div>

          <div className="card p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">What Sets Us Apart</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Our platform uses advanced deep learning and NLP to analyze your data, then applies explainable AI so you always know <span className="font-semibold">why</span> a recommendation was made. No black box—just clarity and confidence.
            </p>
          </div>

          <div className="card p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Why BrightPath?</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Get explainable AI insights showing which factors influenced your recommendations, plus detailed career roadmaps with skills, certifications, and project ideas to help you achieve your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
