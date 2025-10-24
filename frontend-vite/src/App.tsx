import React, { useState } from 'react'
import { LandingPage } from './LandingPage'
import { Navbar } from './Navbar'
import { CareerRecommendation } from './pages/CareerRecommendation'
import { XAIAnalysis } from './pages/XAIAnalysis'
import { CareerRoadmap } from './pages/CareerRoadmap'
import { CareerEvolution } from './pages/CareerEvolution'

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home')
  const [darkMode, setDarkMode] = useState<boolean>(() => document.documentElement.classList.contains('dark'))
  const [recommendedCareers, setRecommendedCareers] = useState<Array<{ career: string; probability: number }>>([])

  const toggleDarkMode = () => {
    const el = document.documentElement
    if (el.classList.contains('dark')) {
      el.classList.remove('dark')
      setDarkMode(false)
    } else {
      el.classList.add('dark')
      setDarkMode(true)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onGetStarted={() => setCurrentPage('career')} />
      case 'career':
        return <CareerRecommendation onCareersRecommended={setRecommendedCareers} />
      case 'evolution':
        return <CareerEvolution />
      case 'xai':
        return <XAIAnalysis />
      case 'roadmap':
        return <CareerRoadmap />
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('career')} />
    }
  }

  return (
    <div className="min-h-screen transition-colors">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      {renderPage()}
    </div>
  )
}

export default App
