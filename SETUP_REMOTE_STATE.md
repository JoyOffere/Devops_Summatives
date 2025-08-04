# Remote State Setup Guide

## Overview
This guide explains how to set up Azure Storage backend for Terraform remote state management.

## Benefits
- **Centralized State**: Store Terraform state in Azure Storage for team collaboration
- **State Locking**: Automatic locking prevents concurrent modifications
- **Versioning**: State file versioning and backup capabilities
- **Security**: Encrypted state storage with Azure access controls

## Setup Steps

### 1. Azure Storage Account
A storage account named `scholardormtfstate` has been configured with:
- Storage Account: `scholardormtfstate`
- Container: `tfstate`
- Location: East US

### 2. Backend Configuration
Backend configuration files have been created:
- `terraform-azure-containerapp/environments/staging/backend.tf`
- `terraform-azure-containerapp/environments/production/backend.tf`

### 3. Required GitHub Secrets
Configure these secrets in your GitHub repository:

```
ARM_CLIENT_ID = <your-service-principal-client-id>
ARM_CLIENT_SECRET = <your-service-principal-client-secret>
ARM_SUBSCRIPTION_ID = <your-azure-subscription-id>
ARM_TENANT_ID = <your-azure-tenant-id>
AZURE_CREDENTIALS = <your-azure-credentials-json>
```

### 4. State Migration
If you have existing local state files, they have been imported into the remote backend.

### 5. CI/CD Pipeline Updates
The `cicd-pipeline.yml` has been updated to:
- Include ARM environment variables for authentication
- Use remote state backend for all Terraform operations
- Maintain proper state synchronization across deployments

## Usage
After setup, all Terraform operations will automatically use the remote state:
- `terraform init` - Connects to remote backend
- `terraform plan` - Uses remote state
- `terraform apply` - Updates remote state
- GitHub Actions - Automatically syncs with remote state

## Security Notes
- State files are encrypted at rest in Azure Storage
- Access is controlled via Azure RBAC and service principal permissions
- State locking prevents concurrent modifications
- No secrets are stored in Git repository
