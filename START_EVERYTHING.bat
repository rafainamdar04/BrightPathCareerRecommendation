@echo off
echo ================================================
echo BrightPath Career Recommendation System
echo Starting Both Backend and Frontend
echo ================================================
echo.

REM Get the directory where this script is located
set "PROJECT_DIR=%~dp0"

echo Starting Backend Server...
echo.
start "BrightPath Backend" cmd /k "cd /d "%PROJECT_DIR%backend" && python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo Waiting 3 seconds for backend to initialize...
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
echo.
start "BrightPath Frontend" cmd /k "cd /d "%PROJECT_DIR%frontend-vite" && npm run dev"

echo.
echo ================================================
echo Both servers are starting!
echo ================================================
echo.
echo Backend will be available at: http://localhost:8000
echo Frontend will be available at: http://localhost:5173
echo.
echo Two new terminal windows have been opened.
echo.
echo Wait a few seconds for both servers to start,
echo then open http://localhost:5173 in your browser!
echo.
echo Press any key to exit this window...
pause >nul
