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
        // Palette B — Indigo + Zinc with Muted Teal Accent
        primary: {
          DEFAULT: '#4f46e5', // indigo-600 (light primary)
          foreground: '#ffffff',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // dark primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          DEFAULT: '#14b8a6', // teal-500
          600: '#0d9488',
        },
        background: {
          DEFAULT: '#FAFAFA', // zinc-50
          dark: '#0B0F14', // deep charcoal-blue
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#111827', // gray-900
        },
        text: {
          DEFAULT: '#18181B', // zinc-900
          muted: '#71717A', // zinc-500
          dark: '#E5E7EB', // gray-200
        },
        border: {
          DEFAULT: '#E4E4E7', // zinc-200
          dark: '#1F2937',    // gray-800
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      }
    },
  },
  plugins: [],
}
