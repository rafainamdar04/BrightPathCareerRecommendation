// Avoid adding @types/node; declare process for type-checking in this config file only.
declare const process: any;
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy to FastAPI backend using configurable target via VITE_API_BASE_URL
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = (env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/$/, '')
  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/predict_top3_careers': { target, changeOrigin: true },
        '/xai_explanations': { target, changeOrigin: true },
        '/career_roadmap': { target, changeOrigin: true },
        '/predict_career_evolution': { target, changeOrigin: true },
        '/upload_resume': { target, changeOrigin: true },
        '/analyze_resume_for_role': { target, changeOrigin: true },
        '/compare_resume_with_roadmap': { target, changeOrigin: true },
        '/static': { target, changeOrigin: true },
        '/api': { target, changeOrigin: true },
      }
    }
  }
})
