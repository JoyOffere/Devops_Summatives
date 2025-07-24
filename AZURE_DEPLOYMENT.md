# Azure Deployment Guide for Scholar-Dorm Application

This guide provides multiple options for deploying your Scholar-Dorm application to Azure.

## Prerequisites

1. **Azure CLI** installed and configured
2. **Docker** installed locally
3. **Azure Subscription** with appropriate permissions
4. **MongoDB Atlas** account (recommended) or Azure Cosmos DB

## Deployment Options

### Option 1: Single Container Deployment (Recommended for Development)

Uses the main `Dockerfile` that combines frontend and backend in one container.

```bash
# Build the image
docker build -t scholar-dorm:latest .

# Run locally to test
docker run -p 80:80 -e MONGO_URI="your-connection-string" scholar-dorm:latest
```

### Option 2: Multi-Container Deployment with Azure Container Instances

Uses separate containers for frontend and backend with better scalability.

```bash
# Deploy using docker-compose
docker-compose -f docker-compose.azure.yml up -d
```

### Option 3: Azure App Service Deployment

#### Step 1: Setup Azure Resources

Run the deployment script:

**Windows:**
```cmd
deploy-azure.bat
```

**Linux/Mac:**
```bash
chmod +x deploy-azure.sh
./deploy-azure.sh
```

#### Step 2: Manual Configuration

1. **Create Resource Group:**
```bash
az group create --name scholar-dorm-rg --location eastus
```

2. **Create Container Registry:**
```bash
az acr create --resource-group scholar-dorm-rg --name scholardormregistry --sku Standard
```

3. **Build and Push Image:**
```bash
# Build image
docker build -t scholardormregistry.azurecr.io/scholar-dorm:latest .

# Login to registry
az acr login --name scholardormregistry

# Push image
docker push scholardormregistry.azurecr.io/scholar-dorm:latest
```

4. **Create App Service:**
```bash
# Create App Service Plan
az appservice plan create \
  --name scholar-dorm-plan \
  --resource-group scholar-dorm-rg \
  --is-linux \
  --sku B1

# Create Web App
az webapp create \
  --resource-group scholar-dorm-rg \
  --plan scholar-dorm-plan \
  --name scholar-dorm-app \
  --deployment-container-image-name scholardormregistry.azurecr.io/scholar-dorm:latest
```

## Environment Configuration

### Required Environment Variables

Create these in your Azure App Service Configuration:

- `NODE_ENV=production`
- `PORT=80`
- `MONGO_URI=your-mongodb-connection-string`

### MongoDB Setup Options

#### Option A: MongoDB Atlas (Recommended)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Add to `MONGO_URI` environment variable

#### Option B: Azure Cosmos DB
1. Create Cosmos DB with MongoDB API
2. Get connection string
3. Add to `MONGO_URI` environment variable

## Security Considerations

### 1. Environment Variables
- Never commit sensitive data to git
- Use Azure Key Vault for production secrets
- Rotate credentials regularly

### 2. Container Security
- Images run as non-root user
- Security headers implemented
- Health checks configured

### 3. Network Security
- Configure CORS properly
- Use HTTPS in production
- Implement rate limiting

## Monitoring and Logging

### Application Insights
```bash
# Enable Application Insights
az webapp config appsettings set \
  --resource-group scholar-dorm-rg \
  --name scholar-dorm-app \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY="your-key"
```

### Log Streaming
```bash
# View live logs
az webapp log tail --resource-group scholar-dorm-rg --name scholar-dorm-app
```

## Scaling Options

### Vertical Scaling
```bash
# Scale up App Service Plan
az appservice plan update \
  --name scholar-dorm-plan \
  --resource-group scholar-dorm-rg \
  --sku S1
```

### Horizontal Scaling
```bash
# Scale out instances
az webapp config set \
  --resource-group scholar-dorm-rg \
  --name scholar-dorm-app \
  --number-of-workers 3
```

## Troubleshooting

### Common Issues

1. **Container won't start:**
   - Check logs: `az webapp log tail`
   - Verify environment variables
   - Test image locally first

2. **Database connection issues:**
   - Verify MONGO_URI format
   - Check network connectivity
   - Confirm database credentials

3. **Build failures:**
   - Check Dockerfile syntax
   - Verify all dependencies are listed
   - Test build locally

### Health Checks

The application includes health check endpoints:
- Backend: `GET /health`
- Frontend: `GET /` (returns 200 OK)

### Debug Commands

```bash
# Check app status
az webapp show --resource-group scholar-dorm-rg --name scholar-dorm-app

# Restart app
az webapp restart --resource-group scholar-dorm-rg --name scholar-dorm-app

# Check container logs
az webapp log download --resource-group scholar-dorm-rg --name scholar-dorm-app
```

## Cost Optimization

1. **Choose appropriate SKU** - Start with B1, scale as needed
2. **Use Azure Reservations** for predictable workloads
3. **Monitor usage** with Azure Cost Management
4. **Set up alerts** for unexpected costs

## Backup and Recovery

### Database Backup
- MongoDB Atlas: Automatic backups included
- Cosmos DB: Point-in-time restore available

### Application Backup
- Container images stored in ACR
- Source code in Git repository
- Configuration backed up with Infrastructure as Code

## Next Steps

1. Set up CI/CD pipeline with GitHub Actions
2. Implement blue-green deployments
3. Add monitoring and alerting
4. Configure custom domain and SSL
5. Implement caching strategies

## Support

For issues:
1. Check Azure App Service diagnostics
2. Review application logs
3. Test components individually
4. Check Azure Status page for service issues
