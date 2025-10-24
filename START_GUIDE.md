# BrightPath Career Recommendation - Quick Start Guide

## Prerequisites
- Python 3.8+ installed
- Node.js 16+ and npm installed

## Backend Setup & Start

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment (first time only)
```bash
python -m venv venv
```

### 3. Activate virtual environment
**Windows (bash):**
```bash
source venv/Scripts/activate
```

**Windows (cmd):**
```cmd
venv\Scripts\activate.bat
```

**Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
```

### 4. Install dependencies (first time only)
```bash
pip install -r requirements.txt
```

### 5. Start the backend server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend should now be running at: http://localhost:8000

## Frontend Setup & Start

### 1. Open a NEW terminal and navigate to frontend directory
```bash
cd frontend-vite
```

### 2. Install dependencies (first time only)
```bash
npm install
```

### 3. Start the frontend development server
```bash
npm run dev
```

The frontend should now be running at: http://localhost:5173

## Access the Application

Open your browser and go to: **http://localhost:5173**

## Features Available

### 1. Career Recommendation
- Fill out the comprehensive form with your academic and personal details
- Click "Get Career Recommendations" to get your top 3 career matches

### 2. After Getting Top 3 Predictions, You Can:

#### a) **Career Evolution** (NEW! 🚀)
- Click the "Career Evolution" button at the top right of results
- See your predicted career trajectory with:
  - Current predicted role
  - Next 3 career stages
  - Personalized timeframes (based on your profile)
  - Confidence scores for each stage
  - Natural language description of your path

#### b) **XAI Analysis** (Per Career)
- Click "Get XAI" button on any of the 3 careers
- Get explainable AI insights showing:
  - SHAP feature importance visualization
  - Top factors influencing the prediction
  - Detailed explanations
  - Downloadable report

#### c) **Career Roadmap** (Per Career)
- Click "Roadmap" button on any of the 3 careers
- Get personalized roadmap with:
  - Skills to learn
  - Recommended certifications
  - Project ideas to build

#### d) **View Both** (Per Career)
- Click "Both" button to get XAI + Roadmap together

#### e) **Compare Careers**
- Select 2-3 careers using checkboxes
- Click "Compare Selected" button
- See side-by-side comparison of XAI insights

## Troubleshooting

### Backend Issues
- **Port 8000 already in use**: Kill the process using port 8000 or change the port
- **Module not found errors**: Make sure virtual environment is activated and dependencies installed
- **TensorFlow errors**: The career evolution will fallback to basic model if advanced model fails

### Frontend Issues
- **Port 5173 already in use**: The dev server will automatically use the next available port
- **API connection errors**: Make sure backend is running on port 8000
- **Build errors**: Delete `node_modules` and run `npm install` again

### Common Errors
- **CORS errors**: Make sure backend is running before starting frontend
- **404 errors**: Check that both servers are running and proxy is configured correctly
- **Blank page**: Check browser console for errors, ensure both servers are running

## Testing the Career Evolution Feature

1. Fill out the career recommendation form completely
2. Click "Get Career Recommendations"
3. Once you see your top 3 career matches, click the "🚀 Career Evolution" button
4. Wait for the AI to predict your career trajectory
5. You'll see:
   - Your current predicted role
   - 3 future career stages with timeframes
   - Confidence scores for each transition
   - A natural language description of your career path

## Notes
- Career Evolution uses advanced AI (Transformer architecture) for predictions
- Timeframes are personalized based on your complete profile (not hardcoded)
- All predictions are data-driven using machine learning models
- The system will fallback gracefully if advanced models aren't available
