# Azure Authentication Setup for GitHub Actions

This project uses Azure authentication for deploying infrastructure via Terraform. You need to set up the following GitHub secrets for the CI/CD pipeline to work.

## Required GitHub Secrets

1. **AZURE_SUBSCRIPTION_ID** - Your Azure subscription ID
2. **AZURE_CLIENT_ID** - Service Principal App ID  
3. **AZURE_CLIENT_SECRET** - Service Principal password
4. **AZURE_TENANT_ID** - Your Azure AD tenant ID
5. **MONGO_URI** - MongoDB connection string

## Setting up Azure Service Principal

1. **Install Azure CLI** (if not already installed):
   ```bash
   # On Windows
   winget install Microsoft.AzureCLI
   
   # Or download from: https://aka.ms/installazurecliwindows
   ```

2. **Login to Azure**:
   ```bash
   az login
   ```

3. **Get your subscription ID**:
   ```bash
   az account show --query id --output tsv
   ```

4. **Create a Service Principal**:
   ```bash
   az ad sp create-for-rbac --name "scholardorm-github-actions" --role "Contributor" --scopes "/subscriptions/YOUR_SUBSCRIPTION_ID" --sdk-auth
   ```

5. **The output will contain the values you need**:
   ```json
   {
     "clientId": "YOUR_CLIENT_ID",
     "clientSecret": "YOUR_CLIENT_SECRET", 
     "subscriptionId": "YOUR_SUBSCRIPTION_ID",
     "tenantId": "YOUR_TENANT_ID"
   }
   ```

## Adding Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of the following:

   - **Name**: `AZURE_SUBSCRIPTION_ID`, **Value**: `YOUR_SUBSCRIPTION_ID`
   - **Name**: `AZURE_CLIENT_ID`, **Value**: `YOUR_CLIENT_ID`
   - **Name**: `AZURE_CLIENT_SECRET`, **Value**: `YOUR_CLIENT_SECRET`
   - **Name**: `AZURE_TENANT_ID`, **Value**: `YOUR_TENANT_ID`
   - **Name**: `MONGO_URI`, **Value**: `YOUR_MONGODB_CONNECTION_STRING`

## Local Development

For local development, you can authenticate using:

```bash
# Login with Azure CLI
az login

# Or set environment variables
$env:ARM_SUBSCRIPTION_ID = "your-subscription-id"
$env:ARM_CLIENT_ID = "your-client-id" 
$env:ARM_CLIENT_SECRET = "your-client-secret"
$env:ARM_TENANT_ID = "your-tenant-id"
```

## Testing the Setup

Once the secrets are configured, pushing to the `develop` or `main` branch will trigger the CI/CD pipeline and deploy the infrastructure to Azure.

## Troubleshooting

- Ensure the Service Principal has `Contributor` role on your Azure subscription
- Verify all secrets are correctly set in GitHub
- Check that your Azure subscription is active and has sufficient resources quota
