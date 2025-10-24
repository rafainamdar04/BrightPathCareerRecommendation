@echo off
echo ========================================
echo  BrightPath Frontend Server Startup
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing npm dependencies...
    call npm install
    echo.
)

REM Start the dev server
echo ========================================
echo  Starting Vite Dev Server on port 5173
echo ========================================
echo.
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
