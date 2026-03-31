# Phase 6 Restructuration - PowerShell Script
# Compatible avec PowerShell 5.1+

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host " PHASE 6: RESTRUCTURATION COMPLETE" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

$baseDir = $PSScriptRoot
$srcDir = Join-Path $baseDir "src"

Write-Host "Creation des dossiers..." -ForegroundColor Yellow
Write-Host ""

# Créer les dossiers
$folders = @(
    "utils",
    "constants",
    "config",
    "types",
    "styles",
    "hooks",
    "api\services"
)

foreach ($folder in $folders) {
    $path = Join-Path $srcDir $folder
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "[OK] Cree: src\$folder" -ForegroundColor Green
    } else {
        Write-Host "[SKIP] Existe deja: src\$folder" -ForegroundColor Gray
    }
}

Write-Host "`nExecution du script Node.js...`n" -ForegroundColor Yellow

# Exécuter le script Node
node (Join-Path $baseDir "phase6-restructure.js")

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host " RESTRUCTURATION TERMINEE!" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

Write-Host "Verifiez avec: npm start`n" -ForegroundColor Yellow

Read-Host "Appuyez sur Entree pour continuer"
