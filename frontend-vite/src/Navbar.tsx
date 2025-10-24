import React, { useState } from 'react'

interface NavbarProps {
  currentPage: string
  onNavigate: (page: string) => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export function Navbar({ currentPage, onNavigate, darkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'career', label: 'Career Recommendation' },
    { id: 'evolution', label: 'Career Evolution' },
    { id: 'xai', label: 'XAI Analysis' },
    { id: 'roadmap', label: 'Career Roadmap' },
  ]

  return (
    <>
  <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/60 border-b border-white/20 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md group-hover:scale-[1.02] transition-all duration-300 ease-in-out">
                <span className="text-white font-extrabold text-xl">B</span>
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                BrightPath
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                    currentPage === item.id
                      ? 'text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800 hover:text-primary-700 dark:hover:text-primary-300 hover:scale-[1.02]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right side - Theme toggle & Hamburger */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl border border-white/20 bg-white/60 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400"
                aria-label="Toggle theme"
              >
                <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {darkMode ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  )}
                </svg>
              </button>

              {/* Hamburger menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-slate-900 border-t border-indigo-100 dark:border-slate-800">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  setIsMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
