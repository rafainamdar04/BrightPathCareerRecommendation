# 🎯 BrightPath Career Recommendation System

## 🚀 Quick Start (Easiest Method)

### Method 1: Using Startup Scripts (Recommended)

#### **Step 1: Start Backend** (Terminal 1)
```bash
cd backend
./start_backend.sh    # For Git Bash/Linux
# OR
start_backend.bat     # For Windows CMD
```

#### **Step 2: Start Frontend** (Terminal 2 - New Window)
```bash
cd frontend-vite
./start_frontend.sh   # For Git Bash/Linux
# OR
start_frontend.bat    # For Windows CMD
```

#### **Step 3: Open Application**
Open your browser and go to: **http://localhost:5173**

---

## 📋 Recent Updates & Fixes

### ✅ Fixed Issues:
1. **Frontend-Backend Connection**: Updated Vite proxy configuration to include all endpoints
2. **Career Evolution Integration**: Added Career Evolution as an option after top 3 predictions
3. **Missing Endpoints**: Added `/predict_career_evolution` and `/static` proxies
4. **UI Enhancement**: Career Evolution now appears as a button alongside Compare feature

### 🆕 New Features:
1. **Career Evolution Button**: Visible after getting top 3 career predictions
2. **Dynamic Career Path**: Shows personalized career trajectory with:
   - Current predicted role
   - 3 future career stages
   - Personalized timeframes (based on your profile, NOT hardcoded)
   - Confidence scores for each transition
   - Timeline visualization

---

## 🛠️ Manual Setup (If Needed)

### Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/Scripts/activate  # Git Bash
# OR
venv\Scripts\activate.bat      # Windows CMD

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Setup
```bash
cd frontend-vite

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 📊 Features Overview

### 1️⃣ Career Recommendation
Fill out comprehensive form with academic and personal details to get top 3 career matches.

### 2️⃣ Career Evolution (NEW! 🚀)
- **Location**: Button appears at top-right after getting top 3 predictions
- **What it does**: 
  - Predicts your career trajectory using advanced AI
  - Shows next 3 career stages with personalized timeframes
  - Displays confidence scores for each transition
  - Provides natural language description of your path
- **Technology**: Uses Transformer architecture with multi-head attention
- **Data-Driven**: NO hardcoded paths - everything learned from data

### 3️⃣ XAI Analysis (Explainable AI)
- **Per Career**: Click "Get XAI" on any predicted career
- **Features**:
  - SHAP feature importance visualization
  - Top influencing factors
  - Detailed explanations
  - Downloadable reports
  - Visual charts

### 4️⃣ Career Roadmap
- **Per Career**: Click "Roadmap" on any predicted career
- **Provides**:
  - Skills to learn
  - Recommended certifications
  - Project ideas to build

### 5️⃣ Combined View
- **Per Career**: Click "Both" to get XAI + Roadmap together

### 6️⃣ Career Comparison
- Select 2-3 careers using checkboxes
- Click "Compare Selected" button
- See side-by-side comparison of XAI insights

---

## 🔧 Technical Details

### Backend (FastAPI + Python)
- **Port**: 8000
- **Framework**: FastAPI
- **ML Models**: 
  - Scikit-learn for career prediction
  - TensorFlow/Keras for career evolution
  - SHAP for explainability
- **API Docs**: http://localhost:8000/docs

### Frontend (React + Vite + TypeScript)
- **Port**: 5173
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Dark Mode**: Supported

### API Endpoints
```
POST /predict_top3_careers       - Get top 3 career predictions
POST /xai_explanations/{role}    - Get XAI insights for a career
GET  /career_roadmap/{role}      - Get career roadmap
POST /predict_career_evolution   - Get career evolution path
GET  /static/*                   - Serve SHAP visualizations
```

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Find and kill the process
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8000 | xargs kill -9
```

**Module not found errors:**
```bash
# Make sure virtual environment is activated
source venv/Scripts/activate  # Git Bash
# Then reinstall
pip install -r requirements.txt
```

**TensorFlow errors:**
- Career evolution will fallback to basic model if advanced model fails
- Check if `career_evolution_model.h5` exists in backend folder

### Frontend Issues

**Port 5173 already in use:**
- Vite will automatically use next available port (5174, 5175, etc.)

**API connection errors:**
- Ensure backend is running on port 8000
- Check browser console for CORS errors
- Verify proxy settings in `vite.config.ts`

**Build errors:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Common Errors

**CORS errors:**
- Make sure backend is running BEFORE starting frontend
- Backend has CORS middleware configured for all origins

**404 errors:**
- Verify both servers are running
- Check proxy configuration in vite.config.ts
- Ensure endpoints match between frontend API calls and backend routes

**Blank page:**
- Check browser console for errors
- Verify both servers are running
- Try clearing browser cache

---

## 📁 Project Structure

```
brightpathFinal/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                      # FastAPI app with all endpoints
│   │   ├── model.py                     # ML model for career prediction
│   │   ├── schemas.py                   # Pydantic schemas
│   │   ├── xai.py                       # XAI/SHAP explanations
│   │   ├── utils.py                     # Utility functions
│   │   ├── career_evolution.py          # Basic career evolution
│   │   └── career_evolution_advanced.py # Advanced AI evolution
│   ├── data/
│   │   └── roo.csv                      # Training data
│   ├── static/                          # SHAP visualizations
│   ├── requirements.txt
│   ├── start_backend.sh                 # Startup script (bash)
│   └── start_backend.bat                # Startup script (Windows)
│
└── frontend-vite/
    ├── src/
    │   ├── App.tsx                      # Main app component
    │   ├── pages/
    │   │   ├── CareerRecommendation.tsx # Main form + results
    │   │   ├── XAIAnalysis.tsx
    │   │   ├── CareerRoadmap.tsx
    │   │   ├── CareerEvolution.tsx
    │   │   └── ResumeAnalysis.tsx
    │   ├── LandingPage.tsx
    │   └── Navbar.tsx
    ├── vite.config.ts                   # Vite config with proxy
    ├── package.json
    ├── start_frontend.sh                # Startup script (bash)
    └── start_frontend.bat               # Startup script (Windows)
```

---

## 🎨 How Career Evolution Works

### User Flow:
1. User fills out career recommendation form
2. Submits form and gets top 3 career predictions
3. Clicks "🚀 Career Evolution" button (new!)
4. System analyzes user profile with 28 features
5. AI predicts next 3 career stages with:
   - Role names
   - Personalized timeframes (e.g., "2-4 years", "5-7 years")
   - Confidence scores
6. Displays beautiful timeline visualization

### Technology Stack:
- **Model**: Transformer architecture with multi-head attention
- **Input**: Complete user profile (all 28 features)
- **Output**: Sequence of future career roles
- **Timeframes**: Calculated based on user's:
  - Academic performance
  - Coding skills
  - Work hours
  - Learning capability
  - And more...

### Key Difference:
- ❌ **NOT hardcoded**: Paths are learned from data
- ✅ **Personalized**: Timeframes adapt to your profile
- ✅ **AI-Powered**: Uses deep learning (Transformer)
- ✅ **Confidence scores**: Shows prediction reliability

---

## 📝 Notes

- All features work without requiring additional data entry after top 3 predictions
- Career Evolution uses your already-submitted form data
- Dark mode is supported throughout the application
- All visualizations are responsive and mobile-friendly
- Data is never sent to external servers - everything runs locally

---

## 🤝 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify both servers are running
3. Check browser console for errors
4. Review API logs in terminal

---

## 📜 License

This project is part of BrightPath Career Recommendation System.
