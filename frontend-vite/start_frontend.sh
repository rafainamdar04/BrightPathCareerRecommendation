#!/bin/bash

echo "========================================"
echo " BrightPath Frontend Server Startup"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
    echo ""
fi

# Start the dev server
echo "========================================"
echo " Starting Vite Dev Server on port 5173"
echo "========================================"
echo ""
echo "Frontend will be available at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
