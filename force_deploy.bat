@echo off
cd /d "%~dp0"
echo ==========================================
echo  FIXING GIT IDENTITY AND DEPLOYING
echo ==========================================

:: 1. Fix Git Identity (Temporary for this repo)
git config user.email "deploy@fix.com"
git config user.name "Deploy Fixer"

:: 2. Add all files (including the updated package.json)
git add .

:: 3. Commit changes (So the deployer sees them)
git commit -m "Emergency fix for build script"

:: 4. THE CRITICAL STEP: Deploy with NO CACHE
echo.
echo ------------------------------------------
echo  STARTING DEPLOYMENT (IGNORING CACHE)...
echo  This forces the server to use your NEW package.json
echo ------------------------------------------
echo.
fly deploy --app sagedo-ai --no-cache

echo.
echo ==========================================
echo  DONE. CHECK FOR SUCCESS MESSAGE ABOVE.
echo ==========================================
pause
