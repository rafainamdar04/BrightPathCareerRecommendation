import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy to FastAPI backend (assumes backend runs on http://localhost:8000)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/predict_top3_careers': 'http://localhost:8000',
      '/xai_explanations': 'http://localhost:8000',
      '/career_roadmap': 'http://localhost:8000',
      '/predict_career_evolution': 'http://localhost:8000',
      '/upload_resume': 'http://localhost:8000',
      '/analyze_resume_for_role': 'http://localhost:8000',
      '/compare_resume_with_roadmap': 'http://localhost:8000',
      '/static': 'http://localhost:8000',
      '/api': 'http://localhost:8000',
    }
  }
})
