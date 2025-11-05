/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
      colors: {
        // Modern Teal Theme - Fresh & Creative
        primary: {
          DEFAULT: '#0d9488', // teal-600 (main brand color)
          foreground: '#ffffff',
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // teal-500
          600: '#0d9488', // primary
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        accent: {
          DEFAULT: '#06b6d4', // cyan-500 (fresh accent)
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        background: {
          DEFAULT: '#f8fafc', // slate-50 (clean white)
          dark: '#0f172a', // slate-900 (dark mode)
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#1e293b', // slate-800
        },
        text: {
          DEFAULT: '#0f172a', // slate-900
          muted: '#64748b', // slate-500
          dark: '#f1f5f9', // slate-100
        },
        border: {
          DEFAULT: '#e2e8f0', // slate-200
          dark: '#334155',    // slate-700
        },
        success: '#10b981', // emerald-500
        warning: '#F59E0B',
        danger: '#EF4444',
      }
    },
  },
  plugins: [],
}
