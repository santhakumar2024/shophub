@echo off
echo ========================================
echo ShopHub E-commerce - Startup Script
echo ========================================
echo.

echo Step 1: Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

echo.
echo Step 2: Checking if dependencies are installed...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo ✓ Dependencies already installed
)

echo.
echo Step 3: Starting JSON Server (Backend)...
echo Backend will run on http://localhost:5000
echo.
start "ShopHub Backend" cmd /k "npm run server"

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo.
echo Step 4: Starting Vite Dev Server (Frontend)...
echo Frontend will run on http://localhost:5173
echo.
start "ShopHub Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo ✓ ShopHub is starting!
echo ========================================
echo.
echo Two terminal windows have opened:
echo 1. Backend (JSON Server) - http://localhost:5000
echo 2. Frontend (Vite) - http://localhost:5173
echo.
echo Wait a few seconds, then open your browser to:
echo http://localhost:5173
echo.
echo Press any key to exit this window...
pause >nul
