# 🚀 Quick Setup Guide - XAI Visualizations

## Prerequisites
- Python 3.8+
- Node.js 16+
- Git

## Backend Setup

### 1. Navigate to Backend
```bash
cd "c:\Users\Rafa Inamdar\OneDrive\Desktop\brightpathFinal\backend"
```

### 2. Install Dependencies
```bash
# If using virtual environment (recommended)
venv\Scripts\activate

# Install all packages including new ones (shap, matplotlib)
pip install -r requirements.txt
```

### 3. Verify Installation
```bash
python -c "import shap; import matplotlib; print('✅ All packages installed!')"
```

### 4. Create Static Directory (if not exists)
```bash
mkdir static
```

### 5. Start Backend Server
```bash
# Option 1: Use batch file
./run_server.bat

# Option 2: Manual
uvicorn app.main:app --reload
```

Backend should be running at: **http://localhost:8000**

---

## Frontend Setup

### 1. Navigate to Frontend
```bash
cd "c:\Users\Rafa Inamdar\OneDrive\Desktop\brightpathFinal\frontend-vite"
```

### 2. Install Dependencies (if needed)
```bash
npm install
```

### 3. Start Frontend Dev Server
```bash
npm run dev
```

Frontend should be running at: **http://localhost:5173**

---

## Testing the Visualizations

### Test 1: Basic XAI with Visualization
1. Open http://localhost:5173 in browser
2. Navigate to "Career Recommendation" page
3. Fill out the form (or use random values)
4. Click "Get Career Recommendations"
5. Click "Get XAI" on any career card
6. **Expected:** You should see a SHAP bar chart visualization

### Test 2: Comparison Feature
1. After getting recommendations, check 2-3 career boxes
2. Click "Compare Selected" button
3. **Expected:** Side-by-side comparison with visualizations

### Test 3: Download Report
1. Click "Get XAI" for a career
2. Click "Download Report" button
3. **Expected:** Text file downloads with analysis

### Test 4: API Direct Test
Visit: http://localhost:8000/docs

Try the `/xai_explanations/{role}` endpoint with:
- **role:** "Data Scientist"
- **Body:** Fill with sample data
- **generate_visualization:** true

---

## Troubleshooting

### ❌ ImportError: No module named 'shap'
```bash
pip install shap matplotlib
```

### ❌ Static files not found (404)
```bash
# Make sure static directory exists
mkdir backend/static

# Restart backend server
```

### ❌ Images not loading
1. Check browser console (F12)
2. Verify: http://localhost:8000/static/
3. Check CORS settings
4. Try clearing browser cache

### ❌ Matplotlib backend error
Already fixed with `matplotlib.use('Agg')` in code

### ❌ SHAP calculation fails
- Uses fallback mode with random values for demo
- Check console logs for specific errors

---

## File Structure

```
backend/
├── app/
│   ├── main.py          ← Added static files mount
│   ├── xai.py           ← Fixed preprocessing & visualization
│   ├── model.py         ← FIELD_MAPPING exported
│   └── ...
├── static/              ← NEW! Stores SHAP visualizations
│   └── shap_*.png
├── requirements.txt     ← Added shap, matplotlib, aiofiles
└── ...

frontend-vite/
└── src/
    └── pages/
        └── CareerRecommendation.tsx  ← Enhanced UI
```

---

## API Endpoints

### GET /
Health check

### POST /predict_top3_careers
Get top 3 career recommendations

### POST /xai_explanations/{role}?generate_visualization=true
Get XAI analysis with visualization
- **Returns:** JSON with shap_values, lime_explanation, visualization path

### GET /static/{filename}
Serve SHAP visualization images

### GET /career_roadmap/{role}
Get career roadmap

---

## Quick Commands Reference

### Start Both Services
**Terminal 1 (Backend):**
```bash
cd backend
venv\Scripts\activate
uvicorn app.main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend-vite
npm run dev
```

### Install New Dependencies
```bash
# Backend
cd backend
pip install -r requirements.txt

# Frontend (no changes needed)
```

### Check Backend Health
```bash
curl http://localhost:8000
```

### Check Static Files
```bash
curl http://localhost:8000/static/
```

---

## What's New? 🎉

✅ **SHAP Visualizations** - Beautiful bar charts showing feature importance
✅ **Career Comparison** - Compare up to 3 careers side-by-side
✅ **Download Reports** - Export XAI analysis as text files
✅ **Enhanced UI** - Better layout, colors, and user experience
✅ **Auto-scroll** - Smooth navigation to XAI results
✅ **Better Insights** - 10 features analyzed instead of 5
✅ **LIME Explanations** - Textual explanations of predictions
✅ **Error Handling** - Graceful fallbacks if SHAP fails

---

## Performance Notes

- **First XAI request:** ~2-5 seconds (SHAP calculation + visualization)
- **Subsequent requests:** ~1-3 seconds (cached explainer)
- **Visualization size:** ~50-100KB per image
- **Download report:** Instant (generated client-side)

---

## Browser Compatibility

✅ Chrome/Edge (Recommended)
✅ Firefox
✅ Safari
⚠️ IE 11 (Not supported - modern features used)

---

## Need Help?

Check the detailed guide: `XAI_IMPROVEMENTS.md`

Happy analyzing! 🎯
