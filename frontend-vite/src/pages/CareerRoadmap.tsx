import React from 'react'

export function CareerRoadmap() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-emerald-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">🗺️</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Career Roadmap
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get a personalized step-by-step guide to achieve your career goals
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-slate-700 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full mb-8">
            <span className="text-5xl">🎯</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Roadmap is Integrated with Recommendations
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            To view career roadmaps, please go to the <strong>Career Recommendation</strong> page, submit the form to get your top 3 career matches, and then click the <strong>"Roadmap"</strong> button on any career card.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll see in the Roadmap:</h3>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">🎓</span>
                <span><strong>Skills to Develop:</strong> Key technical and soft skills you need to master</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏆</span>
                <span><strong>Recommended Certifications:</strong> Industry-recognized credentials to enhance your profile</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🚀</span>
                <span><strong>Recommended Projects:</strong> Hands-on projects to build your portfolio and gain experience</span>
              </li>
            </ul>
          </div>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.history.back(); }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            ← Back to Career Recommendation
          </a>
        </div>
      </div>
    </div>
  )
}
