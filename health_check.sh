#!/bin/bash

# BrightPath System Health Check Script
# This script verifies all components are properly configured

echo "========================================="
echo " BrightPath System Health Check"
echo "========================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check counter
checks_passed=0
checks_failed=0

# Function to check and report
check_item() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} $2"
        ((checks_failed++))
    fi
}

echo "Checking Backend..."
echo "-------------------"

# Check if Python is installed
python --version > /dev/null 2>&1
check_item $? "Python installed"

# Check if backend directory exists
cd backend > /dev/null 2>&1
check_item $? "Backend directory exists"

# Check if requirements.txt exists
if [ -f "requirements.txt" ]; then
    check_item 0 "requirements.txt found"
else
    check_item 1 "requirements.txt found"
fi

# Check if app directory exists
if [ -d "app" ]; then
    check_item 0 "app directory exists"
else
    check_item 1 "app directory exists"
fi

# Check if main.py exists
if [ -f "app/main.py" ]; then
    check_item 0 "app/main.py exists"
else
    check_item 1 "app/main.py exists"
fi

# Check if career evolution files exist
if [ -f "app/career_evolution.py" ]; then
    check_item 0 "career_evolution.py exists"
else
    check_item 1 "career_evolution.py exists"
fi

if [ -f "app/career_evolution_advanced.py" ]; then
    check_item 0 "career_evolution_advanced.py exists"
else
    check_item 1 "career_evolution_advanced.py exists"
fi

# Check if data file exists
if [ -f "data/roo.csv" ]; then
    check_item 0 "Training data (roo.csv) exists"
else
    check_item 1 "Training data (roo.csv) exists"
fi

cd ..
echo ""
echo "Checking Frontend..."
echo "--------------------"

# Check if Node.js is installed
node --version > /dev/null 2>&1
check_item $? "Node.js installed"

# Check if npm is installed
npm --version > /dev/null 2>&1
check_item $? "npm installed"

# Check if frontend directory exists
cd frontend-vite > /dev/null 2>&1
check_item $? "Frontend directory exists"

# Check if package.json exists
if [ -f "package.json" ]; then
    check_item 0 "package.json exists"
else
    check_item 1 "package.json exists"
fi

# Check if vite.config.ts exists
if [ -f "vite.config.ts" ]; then
    check_item 0 "vite.config.ts exists"
else
    check_item 1 "vite.config.ts exists"
fi

# Check if src directory exists
if [ -d "src" ]; then
    check_item 0 "src directory exists"
else
    check_item 1 "src directory exists"
fi

# Check if CareerRecommendation.tsx exists
if [ -f "src/pages/CareerRecommendation.tsx" ]; then
    check_item 0 "CareerRecommendation.tsx exists"
else
    check_item 1 "CareerRecommendation.tsx exists"
fi

cd ..
echo ""
echo "Checking Configuration..."
echo "-------------------------"

# Check vite.config for evolution proxy
if grep -q "predict_career_evolution" frontend-vite/vite.config.ts; then
    check_item 0 "Career evolution proxy configured"
else
    check_item 1 "Career evolution proxy configured"
fi

# Check if startup scripts exist
if [ -f "backend/start_backend.sh" ]; then
    check_item 0 "Backend startup script exists"
else
    check_item 1 "Backend startup script exists"
fi

if [ -f "frontend-vite/start_frontend.sh" ]; then
    check_item 0 "Frontend startup script exists"
else
    check_item 1 "Frontend startup script exists"
fi

echo ""
echo "========================================="
echo " Summary"
echo "========================================="
echo -e "Checks passed: ${GREEN}$checks_passed${NC}"
echo -e "Checks failed: ${RED}$checks_failed${NC}"
echo ""

if [ $checks_failed -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed! System is ready.${NC}"
    echo ""
    echo "To start the application:"
    echo "1. Run: cd backend && ./start_backend.sh"
    echo "2. In a new terminal: cd frontend-vite && ./start_frontend.sh"
    echo "3. Open browser: http://localhost:5173"
else
    echo -e "${RED}✗ Some checks failed. Please review above.${NC}"
    echo ""
    echo "Common fixes:"
    echo "- Install Python: https://www.python.org/downloads/"
    echo "- Install Node.js: https://nodejs.org/"
    echo "- Run: cd backend && pip install -r requirements.txt"
    echo "- Run: cd frontend-vite && npm install"
fi

echo ""
