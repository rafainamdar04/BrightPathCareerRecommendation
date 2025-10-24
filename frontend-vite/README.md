# BrightPath Frontend (Vite + React + Tailwind)

A modern frontend for the BrightPath Career Recommendation backend.

Features:
- Form with numeric inputs as number boxes (no sliders)
- Categorical inputs as dropdowns/multi-selects
- Top 3 career suggestions with confidence scores
- Click a suggestion to see XAI explanations and career roadmap
- Vite dev server proxy to FastAPI to avoid CORS

## Getting Started

1. Install dependencies:
```bash
npm install
```
2. Run the dev server:
```bash
npm run dev
```
3. Ensure your FastAPI backend is running on http://localhost:8000 (or adjust `vite.config.ts`).

Open http://localhost:5173.

