import React, { useEffect, useState } from 'react'
import { LandingPage } from './LandingPage'
import { Navbar } from './Navbar'
import { CareerRecommendation } from './pages/CareerRecommendation'
import { Insights } from './pages/Insights'
import { ErrorBoundary } from './components/ErrorBoundary'

function App() {
  const initialPage = (() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const qp = params.get('page')
      if (qp) return qp
    } catch {}
    return 'home'
  })()

  const [currentPage, setCurrentPage] = useState<string>(initialPage)
  const [darkMode, setDarkMode] = useState<boolean>(() => document.documentElement.classList.contains('dark'))
  const [recommendedCareers, setRecommendedCareers] = useState<Array<{ career: string; probability: number }>>([])

  // Keep URL in sync with nav state for shareable links
  useEffect(() => {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('page', currentPage)
      if (currentPage !== 'insights') {
        url.searchParams.delete('role')
        url.searchParams.delete('tab')
      }
      window.history.replaceState(null, '', url.toString())
    } catch {}
  }, [currentPage])

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
      case 'insights':
        return <Insights />
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
      <ErrorBoundary>
        {renderPage()}
      </ErrorBoundary>
    </div>
  )
}

export default App
