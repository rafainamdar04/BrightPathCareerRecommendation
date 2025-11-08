import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy to FastAPI backend (backend runs on http://127.0.0.1:8001)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/predict_top3_careers': 'http://127.0.0.1:8001',
      '/xai_explanations': 'http://127.0.0.1:8001',
      '/xai_counterfactual': 'http://127.0.0.1:8001',
      '/career_roadmap': 'http://127.0.0.1:8001',
      '/predict_career_evolution': 'http://127.0.0.1:8001',
      '/upload_resume': 'http://127.0.0.1:8001',
      '/analyze_resume_for_role': 'http://127.0.0.1:8001',
      '/compare_resume_with_roadmap': 'http://127.0.0.1:8001',
      '/model_architecture': 'http://127.0.0.1:8001',
      '/static': 'http://127.0.0.1:8001',
      '/api': 'http://127.0.0.1:8001',
    }
  }
})
