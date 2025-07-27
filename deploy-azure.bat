@echo off
REM Azure deployment script for Windows

echo Starting Azure deployment process...

REM Configuration - Update these values
set RESOURCE_GROUP=scholar-dorm-rg
set APP_SERVICE_PLAN=scholar-dorm-plan
set WEB_APP_NAME=scholar-dorm-app
set ACR_NAME=scholardormregistry
set LOCATION=eastus

echo Creating resource group...
az group create --name %RESOURCE_GROUP% --location %LOCATION%

echo Creating Azure Container Registry...
az acr create ^
  --resource-group %RESOURCE_GROUP% ^
  --name %ACR_NAME% ^
  --sku Standard ^
  --location %LOCATION%

echo Creating App Service Plan...
az appservice plan create ^
  --name %APP_SERVICE_PLAN% ^
  --resource-group %RESOURCE_GROUP% ^
  --location %LOCATION% ^
  --is-linux ^
  --sku B1

echo Building and pushing Docker image...
docker build -t %ACR_NAME%.azurecr.io/scholar-dorm:latest .

echo Logging in to ACR...
az acr login --name %ACR_NAME%

echo Pushing image...
docker push %ACR_NAME%.azurecr.io/scholar-dorm:latest

echo Creating Web App...
az webapp create ^
  --resource-group %RESOURCE_GROUP% ^
  --plan %APP_SERVICE_PLAN% ^
  --name %WEB_APP_NAME% ^
  --deployment-container-image-name %ACR_NAME%.azurecr.io/scholar-dorm:latest

echo Configuring Web App settings...
az webapp config appsettings set ^
  --resource-group %RESOURCE_GROUP% ^
  --name %WEB_APP_NAME% ^
  --settings NODE_ENV=production PORT=80 MONGO_URI="your-mongodb-connection-string"

echo Deployment completed!
echo Your application will be available at: https://%WEB_APP_NAME%.azurewebsites.net

pause
