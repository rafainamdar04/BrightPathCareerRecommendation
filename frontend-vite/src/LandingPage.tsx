import React from 'react'

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white sm:text-6xl md:text-7xl animate-slideDown">
            <span className="block">Welcome to</span>
            <span className="block">BrightPath</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 animate-slideUp animation-delay-200">
            Find roles where you’ll thrive. We’ll match your strengths with career paths that fit—clearly and confidently.
          </p>
          <div className="mt-10 flex gap-4 justify-center animate-slideUp animation-delay-400">
            <button
              onClick={onGetStarted}
              className="btn-primary px-8 py-3 text-lg rounded-2xl"
            >
              Get started →
            </button>
            <button
              onClick={onGetStarted}
              className="btn-secondary px-8 py-3 text-lg rounded-2xl"
            >
              Learn more
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-24 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="card p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300">
              BrightPath aims to empower individuals by providing intelligent, data-driven career recommendations tailored to their unique profiles. We believe everyone deserves guidance in finding their ideal career.
            </p>
          </div>

          <div className="card p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]">
            <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mb-4 shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">How It Works</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Simply fill out our comprehensive questionnaire covering your academic performance, skills, interests, and career preferences. Our advanced machine learning model analyzes your responses to predict the top 3 careers that best match your profile.
            </p>
          </div>

          <div className="card p-8 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02] md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 shadow-md">
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

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
            What You'll Get
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-md">
                1
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Top 3 Career Predictions</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Receive your top 3 career recommendations with confidence scores, ranked by how well they match your profile.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold shadow-md">
                2
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Explainable AI Insights</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Understand exactly which factors (like your skills, interests, or academic performance) influenced each career recommendation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                3
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Career Roadmaps</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Get detailed roadmaps showing the skills to learn, certifications to pursue, and projects to build for each recommended career.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold shadow-md">
                4
              </div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Personalized Experience</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  Your form data is saved locally, so you can return anytime and pick up where you left off without losing your progress.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 card p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Discover Your Perfect Career?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
            Take the first step towards your bright future. Our AI-powered system is ready to guide you.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 text-lg font-semibold text-white dark:text-slate-900 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-lg shadow-sm transition-colors"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  )
}
