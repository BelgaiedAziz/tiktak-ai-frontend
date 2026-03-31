@echo off
echo.
echo ====================================
echo  PHASE 6: RESTRUCTURATION COMPLETE
echo ====================================
echo.

cd /d "%~dp0"

echo Creation des dossiers...
echo.

if not exist "src\utils" mkdir "src\utils"
if not exist "src\constants" mkdir "src\constants"
if not exist "src\config" mkdir "src\config"
if not exist "src\types" mkdir "src\types"
if not exist "src\styles" mkdir "src\styles"
if not exist "src\hooks" mkdir "src\hooks"
if not exist "src\api\services" mkdir "src\api\services"

echo [OK] Dossiers crees
echo.
echo Execution du script Node.js...
echo.

node phase6-restructure.js

echo.
echo ====================================
echo  RESTRUCTURATION TERMINEE!
echo ====================================
echo.
echo Verifiez avec: npm start
echo.
pause
