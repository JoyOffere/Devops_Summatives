# Azure CLI Post-Installation Setup
# Run this after restarting your terminal

Write-Host "================================" -ForegroundColor Green
Write-Host "Azure CLI Setup and Deployment" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host ""

# Check if Azure CLI is available
try {
    $azVersion = az --version
    Write-Host "✓ Azure CLI is installed and ready!" -ForegroundColor Green
    Write-Host $azVersion[0] -ForegroundColor Gray
} catch {
    Write-Host "✗ Azure CLI not found. Please restart your terminal and try again." -ForegroundColor Red
    Write-Host "If the issue persists, manually add Azure CLI to your PATH:" -ForegroundColor Yellow
    Write-Host "C:\Program Files (x86)\Microsoft SDKs\Azure\CLI2\wbin" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Login to Azure: az login" -ForegroundColor White
Write-Host "2. Set your subscription: az account set --subscription 'your-subscription-id'" -ForegroundColor White
Write-Host "3. Run deployment script: .\deploy-azure.bat" -ForegroundColor White
Write-Host ""

Write-Host "Alternative Docker-only deployment:" -ForegroundColor Cyan
Write-Host "1. Build image: docker build -t scholar-dorm ." -ForegroundColor White
Write-Host "2. Test locally: docker run -p 80:80 -e MONGO_URI='your-connection' scholar-dorm" -ForegroundColor White
Write-Host "3. Push to registry and deploy via Azure Portal" -ForegroundColor White
Write-Host ""

Write-Host "Files ready for deployment:" -ForegroundColor Yellow
Write-Host "- Dockerfile (main application)" -ForegroundColor Gray
Write-Host "- frontend/Dockerfile.azure (frontend only)" -ForegroundColor Gray
Write-Host "- backend/Dockerfile.azure (backend only)" -ForegroundColor Gray
Write-Host "- docker-compose.azure.yml (multi-container)" -ForegroundColor Gray
Write-Host "- deploy-azure.bat (deployment script)" -ForegroundColor Gray
Write-Host ""