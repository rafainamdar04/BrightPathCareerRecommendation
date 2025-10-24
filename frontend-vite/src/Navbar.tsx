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
  <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#111827]/80 border-b border-[#E4E4E7] dark:border-[#1F2937] backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#111827]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white shadow-sm group-hover:shadow-md transition-all duration-200 ease-out">
                <span className="font-extrabold text-xl">B</span>
              </div>
              <span className="text-xl font-extrabold text-zinc-900 dark:text-gray-100">BrightPath</span>
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
                className="p-2 rounded-xl border border-[#E4E4E7] dark:border-[#1F2937] bg-white dark:bg-[#111827] hover:bg-zinc-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
                className="md:hidden p-2 rounded-lg border border-[#E4E4E7] dark:border-[#1F2937] hover:bg-zinc-50 dark:hover:bg-gray-800 transition-colors"
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
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-[#111827] border-t border-[#E4E4E7] dark:border-[#1F2937]">
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
                    : 'text-zinc-700 dark:text-gray-300 hover:bg-zinc-50 dark:hover:bg-gray-800'
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
