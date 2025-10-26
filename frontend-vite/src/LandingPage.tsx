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
          <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <span className="text-white text-sm font-semibold">AI/ML/DL Capstone Project</span>
          </div>
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white sm:text-6xl md:text-7xl animate-slideDown">
            <span className="block">Welcome to</span>
            <span className="block text-gradient bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">BrightPath</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 animate-slideUp animation-delay-200">
            Find roles where you'll thrive. We'll match your strengths with career paths that fit—clearly and confidently.
          </p>
          <p className="mt-4 max-w-3xl mx-auto text-base text-slate-500 dark:text-slate-400">
            Powered by Deep Learning, Transformer Models, Natural Language Processing, and Explainable AI
          </p>
          <div className="mt-8">
            <button onClick={onGetStarted} className="btn-primary px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              Start Your Journey Now
            </button>
          </div>
        </div>

        {/* Technology Stack Badge Section */}
        <div className="mb-16 animate-fadeIn">
          <h3 className="text-center text-lg font-semibold text-slate-700 dark:text-slate-300 mb-6">Built With Cutting-Edge Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">🧠 Neural Networks</span>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">🔄 Transformers</span>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">📝 NLP</span>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">💡 XAI (SHAP)</span>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">⚡ FastAPI</span>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">⚛️ React</span>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">Key AI/ML Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="card p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Multi-Class Classification</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Deep neural network trained on comprehensive career data to predict the most suitable career paths from multiple categories with high accuracy.
              </p>
            </div>

            <div className="card p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🔮</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Career Evolution Prediction</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Transformer architecture with multi-head attention analyzes career trajectories to predict your next 3 career stages with personalized timeframes.
              </p>
            </div>

            <div className="card p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Resume Intelligence</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                NLP-powered resume parsing extracts skills, experience, and achievements automatically using advanced natural language processing techniques.
              </p>
            </div>

            <div className="card p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-yellow-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explainable Predictions</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                SHAP (SHapley Additive exPlanations) values reveal which features influenced each prediction, ensuring complete transparency in AI decisions.
              </p>
            </div>

            <div className="card p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-red-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Skill Gap Analysis</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                ML algorithms analyze your current skills against target careers to identify gaps and provide actionable learning recommendations.
              </p>
            </div>

            <div className="card p-6 hover:shadow-2xl transition-all duration-300 border-l-4 border-indigo-500">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">🗺️</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Roadmaps</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                AI-generated step-by-step career progression plans with skills to learn, certifications to earn, and projects to build.
              </p>
            </div>
          </div>
        </div>

        {/* Pipeline Visual */}
        <div className="flex flex-col items-center mb-20">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How BrightPath Works</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8 max-w-2xl">
            Our AI/ML pipeline processes your data through multiple stages of deep learning models to deliver personalized career insights
          </p>
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="flex flex-col items-center max-w-[140px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-200">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="#fff" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-center">Your Input</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">Skills, interests, academics, resume</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center max-w-[160px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-200">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <rect x="8" y="8" width="16" height="16" rx="8" fill="#fff" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-center">Deep Learning Model</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">Neural network finds patterns & predicts careers</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center max-w-[140px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-200">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <polygon points="16,4 28,28 4,28" fill="#fff" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-center">Career Recommendations</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">Top 3 matches with confidence scores</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center max-w-[160px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-200">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <ellipse cx="16" cy="16" rx="12" ry="8" fill="#fff" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-center">NLP Resume Parsing</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">Extracts skills, experience & achievements</span>
            </div>
            <span className="text-2xl font-bold text-slate-400">→</span>
            <div className="flex flex-col items-center max-w-[140px]">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-2 shadow-lg hover:scale-110 transition-transform duration-200">
                <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <rect x="10" y="10" width="12" height="12" rx="6" fill="#fff" />
                </svg>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-center">XAI Transparency</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">Explains why each career was recommended</span>
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-8">Technical Highlights</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Model Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Career Paths Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">20+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Features Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">Real-time</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">AI Predictions</div>
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
