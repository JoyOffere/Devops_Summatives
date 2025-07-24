# Quick Deployment Guide

## Step 1: Restart Your Terminal
Azure CLI was installed successfully, but you need to restart your terminal for the PATH to be updated.

## Step 2: Verify Installation
After restarting, run:
```bash
az --version
```

## Step 3: Login to Azure
```bash
az login
```
This will open your browser for authentication.

## Step 4: Choose Your Deployment Method

### Method A: Quick Single Container Deployment
```bash
# Build the main application (combines frontend + backend)
docker build -t scholar-dorm .

# Test locally first
docker run -p 80:80 -e MONGO_URI="your-mongodb-connection-string" scholar-dorm

# If it works, proceed with Azure deployment using deploy-azure.bat
```

### Method B: Separate Frontend/Backend Deployment
```bash
# Build frontend
cd frontend
docker build -f Dockerfile.azure -t scholar-dorm-frontend .

# Build backend  
cd ../backend
docker build -f Dockerfile.azure -t scholar-dorm-backend .

# Deploy using docker-compose
cd ..
docker-compose -f docker-compose.azure.yml up -d
```

### Method C: Azure App Service Deployment
```bash
# Run the automated deployment script
.\deploy-azure.bat
```

## Step 5: Configure Environment Variables
Before deployment, make sure you have:
- MongoDB connection string (MongoDB Atlas recommended)
- Azure subscription ID
- Unique names for your Azure resources

## Troubleshooting
If `az` command is still not found after restart:
1. Check if Azure CLI is in your PATH
2. Try running from Command Prompt instead of Git Bash
3. Manually add to PATH: `C:\Program Files (x86)\Microsoft SDKs\Azure\CLI2\wbin`

## Your Docker Files Are Ready!
- ✅ `Dockerfile` - Main application (recommended for beginners)
- ✅ `frontend/Dockerfile.azure` - Frontend only
- ✅ `backend/Dockerfile.azure` - Backend only
- ✅ `docker-compose.azure.yml` - Multi-container setup
- ✅ `deploy-azure.bat` - Automated deployment script
- ✅ `AZURE_DEPLOYMENT.md` - Comprehensive guide
