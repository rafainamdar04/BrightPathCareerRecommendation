#!/bin/bash

echo "=================================================="
echo "BrightPath Application Status Check"
echo "=================================================="
echo ""

# Check Backend
echo "🔍 Checking Backend (port 8000)..."
if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "✅ Backend is RUNNING"
    echo "   Response: $(curl -s http://localhost:8000/ | head -c 100)"
else
    echo "❌ Backend is NOT running"
    echo "   Start with: cd backend && python -m uvicorn app.main:app --reload"
fi
echo ""

# Check Frontend
echo "🔍 Checking Frontend (port 5173)..."
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend is RUNNING"
else
    echo "❌ Frontend is NOT running"
    echo "   Start with: cd frontend-vite && npm run dev"
fi
echo ""

# Test Backend Endpoints
echo "🧪 Testing Backend Endpoints..."
if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    
    # Test predict_top3_careers
    echo -n "  - /predict_top3_careers ... "
    TEST_DATA='{"Acedamic_percentage_in_Operating_Systems":75,"Percentage_in_Algorithms":80,"Percentage_in_Programming_Concepts":85,"Percentage_in_Software_Engineering":78,"Percentage_in_Computer_Networks":70,"Percentage_in_Electronics_Subjects":65,"Percentage_in_Computer_Architecture":72,"Percentage_in_Mathematics":88,"Percentage_in_Communication_skills":75,"Hours_working_per_day":8,"Logical_quotient_rating":8,"Hackathons":3,"Coding_skills_rating":7,"Public_speaking_points":6,"Can_work_long_time_before_system":"yes","Self_learning_capability":"yes","Extra_courses_did":"yes","Certifications":"app development","Workshops":"web technologies","Reading_and_writing_skills":"excellent","Memory_capability_score":"excellent","Interested_subjects":"programming","Interested_career_area":"software development","Job_Higher_Studies":"Job","Type_of_company_want_to_settle_in":"product development","Management_or_Technical":"Technical","Hard_smart_worker":"smart worker","Worked_in_teams_ever":"yes"}'
    
    RESPONSE=$(curl -s -X POST http://localhost:8000/predict_top3_careers \
        -H "Content-Type: application/json" \
        -d "$TEST_DATA" 2>&1)
    
    if echo "$RESPONSE" | grep -q "top_predictions"; then
        echo "✅ Working"
    else
        echo "❌ Failed"
    fi
    
    # Test career_roadmap
    echo -n "  - /career_roadmap ... "
    if curl -s http://localhost:8000/career_roadmap/Software%20Developer | grep -q "skills"; then
        echo "✅ Working"
    else
        echo "❌ Failed"
    fi
    
    # Test xai_explanations
    echo -n "  - /xai_explanations ... "
    RESPONSE=$(curl -s -X POST "http://localhost:8000/xai_explanations/Software%20Developer?generate_visualization=false" \
        -H "Content-Type: application/json" \
        -d "$TEST_DATA" 2>&1)
    
    if echo "$RESPONSE" | grep -q "career"; then
        echo "✅ Working"
    else
        echo "❌ Failed"
    fi
    
else
    echo "  ⚠️ Backend not running - skipping endpoint tests"
fi
echo ""

# Check Dependencies
echo "📦 Checking Dependencies..."
cd "$(dirname "$0")/backend"

echo -n "  - Python packages ... "
if python -c "import fastapi, pandas, numpy, sklearn, spacy, PyPDF2, docx2txt" 2>/dev/null; then
    echo "✅ All installed"
else
    echo "❌ Some missing - run: pip install -r requirements.txt"
fi

echo -n "  - spaCy model ... "
if python -c "import spacy; spacy.load('en_core_web_sm')" 2>/dev/null; then
    echo "✅ Installed"
else
    echo "❌ Missing - run: python -m spacy download en_core_web_sm"
fi

echo ""
echo "=================================================="
echo "Summary"
echo "=================================================="
echo ""

if curl -s http://localhost:8000/ > /dev/null 2>&1 && curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Application is FULLY OPERATIONAL"
    echo ""
    echo "   Backend: http://localhost:8000"
    echo "   Frontend: http://localhost:5173"
    echo ""
    echo "   Open http://localhost:5173 in your browser! 🚀"
elif curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "⚠️ Backend is running, but Frontend is not"
    echo ""
    echo "   Start frontend with:"
    echo "   cd frontend-vite && npm run dev"
else
    echo "❌ Application is NOT running"
    echo ""
    echo "   Start backend with:"
    echo "   cd backend && python -m uvicorn app.main:app --reload"
    echo ""
    echo "   Start frontend with:"
    echo "   cd frontend-vite && npm run dev"
fi

echo ""
echo "=================================================="
