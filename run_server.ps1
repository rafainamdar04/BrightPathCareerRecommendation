# PowerShell script to run the FastAPI server with virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Green
& ".\venv\Scripts\Activate.ps1"
Write-Host ""
Write-Host "Starting FastAPI server..." -ForegroundColor Green
uvicorn app.main:app --reload
