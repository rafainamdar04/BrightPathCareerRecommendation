#!/bin/bash

echo "================================================"
echo "BrightPath Career Recommendation System"
echo "Starting Both Backend and Frontend"
echo "================================================"
echo ""

# Get the directory where this script is located
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Function to check if port is available
check_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        lsof -i:$port &> /dev/null
        return $?
    elif command -v netstat &> /dev/null; then
        netstat -an | grep ":$port " | grep LISTEN &> /dev/null
        return $?
    else
        # Fallback: try to connect
        timeout 1 bash -c "cat < /dev/null > /dev/tcp/localhost/$port" 2>/dev/null
        return $?
    fi
}

# Check if backend is already running
if check_port 8000; then
    echo "⚠️  Backend is already running on port 8000"
    echo "   If you want to restart it, stop the existing process first."
else
    echo "Starting Backend Server..."
    cd "$PROJECT_DIR/backend"
    python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    echo "   Backend PID: $BACKEND_PID"
    echo "   Waiting for backend to initialize..."
    sleep 3
fi

echo ""

# Check if frontend is already running
if check_port 5173; then
    echo "⚠️  Frontend is already running on port 5173"
    echo "   If you want to restart it, stop the existing process first."
else
    echo "Starting Frontend Server..."
    cd "$PROJECT_DIR/frontend-vite"
    npm run dev &
    FRONTEND_PID=$!
    echo "   Frontend PID: $FRONTEND_PID"
fi

echo ""
echo "================================================"
echo "Both servers are starting!"
echo "================================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Wait a few seconds for both servers to start,"
echo "then open http://localhost:5173 in your browser!"
echo ""
echo "To stop the servers, use Ctrl+C or run:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "================================================"
