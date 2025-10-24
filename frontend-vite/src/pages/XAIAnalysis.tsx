import React from 'react'

export function XAIAnalysis() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-300">
            <span className="text-3xl">🧠</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Explainable AI Analysis
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get detailed AI explanations for your career recommendations
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-slate-700 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full mb-8">
            <span className="text-5xl">💡</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            XAI is Integrated with Recommendations
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            To view XAI explanations, please go to the <strong>Career Recommendation</strong> page, submit the form to get your top 3 career matches, and then click the <strong>"Get XAI"</strong> button on any career card.
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">What you'll see with XAI:</h3>
            <ul className="text-left space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span><strong>SHAP Values:</strong> Feature importance scores showing which factors most influenced the recommendation</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔍</span>
                <span><strong>LIME Explanations:</strong> Local interpretability insights about your specific profile</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span><strong>Feature Contributions:</strong> Detailed breakdown of how each input affected the prediction</span>
              </li>
            </ul>
          </div>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.history.back(); }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            ← Back to Career Recommendation
          </a>
        </div>
      </div>
    </div>
  )
}
