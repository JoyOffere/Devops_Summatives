@echo off
REM Azure CLI Installation Script for Windows

echo ================================================
echo Azure CLI Installation Script
echo ================================================
echo.

echo Step 1: Downloading Azure CLI MSI installer...
echo Please follow these manual steps:
echo.
echo 1. Open your web browser
echo 2. Go to: https://aka.ms/installazurecliwindows
echo 3. Download the MSI file
echo 4. Run the MSI installer as Administrator
echo 5. Follow the installation wizard
echo 6. Restart your terminal after installation
echo.

echo Alternative: Using winget (if available)
echo Run: winget install Microsoft.AzureCLI
echo.

echo After installation, verify with: az --version
echo.

echo ================================================
echo Docker Alternative (No Azure CLI needed)
echo ================================================
echo.
echo If you can't install Azure CLI, you can still deploy using Docker:
echo.
echo 1. Build your image: docker build -t scholar-dorm .
echo 2. Run locally: docker run -p 80:80 scholar-dorm
echo 3. Push to Docker Hub: docker push your-username/scholar-dorm
echo 4. Deploy to Azure Container Instances via Azure Portal
echo.

pause
