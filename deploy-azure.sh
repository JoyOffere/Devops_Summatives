#!/bin/bash
# Azure deployment script for the full application

set -e

echo "Starting Azure deployment process..."

# Configuration
RESOURCE_GROUP="scholar-dorm-rg"
APP_SERVICE_PLAN="scholar-dorm-plan"
WEB_APP_NAME="scholar-dorm-app"
ACR_NAME="scholardormregistry"
LOCATION="eastus"
SUBSCRIPTION_ID="your-subscription-id"

# Login to Azure (uncomment if needed)
# az login

# Set subscription
# az account set --subscription $SUBSCRIPTION_ID

echo "Creating resource group..."
az group create --name $RESOURCE_GROUP --location $LOCATION

echo "Creating Azure Container Registry..."
az acr create \
  --resource-group $RESOURCE_GROUP \
  --name $ACR_NAME \
  --sku Standard \
  --location $LOCATION

echo "Creating App Service Plan..."
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --is-linux \
  --sku B1

echo "Building and pushing Docker image..."
# Build the main application image
docker build -t $ACR_NAME.azurecr.io/scholar-dorm:latest .

# Login to ACR
az acr login --name $ACR_NAME

# Push image
docker push $ACR_NAME.azurecr.io/scholar-dorm:latest

echo "Creating Web App..."
az webapp create \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --name $WEB_APP_NAME \
  --deployment-container-image-name $ACR_NAME.azurecr.io/scholar-dorm:latest

echo "Configuring Web App settings..."
az webapp config appsettings set \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP_NAME \
  --settings \
    NODE_ENV=production \
    PORT=80 \
    MONGO_URI="your-mongodb-connection-string"

echo "Enabling continuous deployment..."
az webapp deployment container config \
  --resource-group $RESOURCE_GROUP \
  --name $WEB_APP_NAME \
  --enable-cd true

echo "Deployment completed!"
echo "Your application will be available at: https://$WEB_APP_NAME.azurewebsites.net"
