# 🔐 Configuration Setup Guide

This guide explains how to set up your local development environment using the provided configuration templates.

## 📋 Quick Setup

### 1. **Backend Environment**
```bash
# Copy the example file
cp backend/.env.example backend/.env

# Edit with your actual values
# Replace YOUR_MONGODB_CONNECTION_STRING with your actual MongoDB URI
```

### 2. **Frontend Environment**
```bash
# Copy the example file  
cp frontend/.env.example frontend/.env

# Update with your backend URL if needed
```

### 3. **Terraform Configuration**

For each environment (backend, staging, production):

```bash
# Backend environment
cp terraform-azure-containerapp/environments/backend/terraform.tfvars.example \
   terraform-azure-containerapp/environments/backend/terraform.tfvars

# Staging environment  
cp terraform-azure-containerapp/environments/staging/terraform.tfvars.example \
   terraform-azure-containerapp/environments/staging/terraform.tfvars

# Production environment
cp terraform-azure-containerapp/environments/production/terraform.tfvars.example \
   terraform-azure-containerapp/environments/production/terraform.tfvars
```

## 🔑 Required Credentials

### **MongoDB Connection String**
Replace `YOUR_MONGODB_CONNECTION_STRING` with:
```
mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### **Azure Container Registry Password**  
Replace `YOUR_ACR_PASSWORD` with your actual ACR admin password from Azure portal.

## 🚀 GitHub Secrets (for CI/CD)

Add these secrets in your GitHub repository:

| Secret Name | Description | Where to Get |
|-------------|-------------|--------------|
| `AZURE_CLIENT_ID` | Service Principal App ID | Azure Portal → App Registrations |
| `AZURE_CLIENT_SECRET` | Service Principal Secret | Azure Portal → App Registrations |
| `AZURE_SUBSCRIPTION_ID` | Your Azure Subscription ID | Azure Portal → Subscriptions |
| `AZURE_TENANT_ID` | Your Azure Tenant ID | Azure Portal → Azure Active Directory |
| `SNYK_TOKEN` | Snyk API Token | Snyk Dashboard → Settings |
| `GITGUARDIAN_API_KEY` | GitGuardian API Key | GitGuardian Dashboard |
| `SONAR_TOKEN` | SonarCloud Token | SonarCloud → Security |
| `SLACK_WEBHOOK_URL` | Slack Webhook for notifications | Slack App Settings |

## 📁 File Structure

```
├── backend/
│   ├── .env.example          # Template for backend environment
│   └── .env                  # Your actual backend config (gitignored)
├── frontend/
│   ├── .env.example          # Template for frontend environment  
│   └── .env                  # Your actual frontend config (gitignored)
└── terraform-azure-containerapp/environments/
    ├── backend/
    │   ├── terraform.tfvars.example    # Template
    │   └── terraform.tfvars            # Your actual config (gitignored)
    ├── staging/
    │   ├── terraform.tfvars.example    # Template
    │   └── terraform.tfvars            # Your actual config (gitignored)
    └── production/
        ├── terraform.tfvars.example    # Template
        └── terraform.tfvars            # Your actual config (gitignored)
```

## 🛡️ Security Notes

- ✅ **`.example` files are safe to commit** - they contain no real credentials
- ❌ **Never commit actual `.env` or `.tfvars` files** - they're gitignored for security
- 🔄 **Always use placeholders in examples** - makes it clear what needs to be replaced

## 🎯 For Your Oral Viva

You can demonstrate:
1. **Security best practices** - showing how credentials are handled
2. **Environment configuration** - explaining the multi-environment setup
3. **CI/CD integration** - showing how GitHub Secrets work with the pipelines

---

⚡ **Pro Tip**: Keep your `.example` files updated when you add new configuration options!
