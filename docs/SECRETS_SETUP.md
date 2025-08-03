# GitHub Secrets Configuration Template

This file provides a template for configuring the required secrets in your GitHub repository to enable the CI/CD pipelines.

## 🔑 Required Secrets

### Azure Authentication

#### AZURE_CREDENTIALS
Complete service principal credentials in JSON format:
```json
{
  "clientId": "your-service-principal-client-id",
  "clientSecret": "your-service-principal-client-secret",
  "subscriptionId": "850ca137-52f3-4c84-b574-df173011600e",
  "tenantId": "your-azure-tenant-id"
}
```

#### AZURE_SUBSCRIPTION_ID
```
850ca137-52f3-4c84-b574-df173011600e
```

#### ARM_CLIENT_ID
```
your-service-principal-client-id
```

#### ARM_CLIENT_SECRET
```
your-service-principal-client-secret
```

#### ARM_TENANT_ID
```
your-azure-tenant-id
```

### Security Scanning Tools

#### SNYK_TOKEN
- Sign up at https://snyk.io/
- Go to Account Settings > API Token
- Copy the token value

#### SONAR_TOKEN
- Sign up at https://sonarcloud.io/
- Create a new project
- Go to Administration > Security > Tokens
- Generate a new token

#### GITGUARDIAN_API_KEY
- Sign up at https://www.gitguardian.com/
- Go to API > Personal Access Tokens
- Generate a new token with appropriate permissions

### Notification Services (Optional)

#### SLACK_WEBHOOK_URL
- Create a Slack app at https://api.slack.com/apps
- Add incoming webhook functionality
- Copy the webhook URL

## 🛠️ Setting Up Azure Service Principal

### 1. Create Service Principal
```bash
# Login to Azure
az login

# Create service principal
az ad sp create-for-rbac \
  --name "github-actions-scholardorm" \
  --role "Contributor" \
  --scopes "/subscriptions/850ca137-52f3-4c84-b574-df173011600e" \
  --sdk-auth
```

### 2. Required Azure Permissions

The service principal needs the following permissions:

#### Resource Group Level:
- **Contributor** - Deploy and manage resources
- **User Access Administrator** - Manage role assignments

#### Subscription Level:
- **Reader** - Read subscription metadata
- **Security Reader** - Access security center data

### 3. Additional Role Assignments
```bash
# Add Container Registry permissions
az role assignment create \
  --assignee <service-principal-id> \
  --role "AcrPush" \
  --scope "/subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.ContainerRegistry/registries/acrcontainerappstaging"

az role assignment create \
  --assignee <service-principal-id> \
  --role "AcrPush" \
  --scope "/subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.ContainerRegistry/registries/scholardormproductionacr"

# Add monitoring permissions
az role assignment create \
  --assignee <service-principal-id> \
  --role "Monitoring Reader" \
  --scope "/subscriptions/850ca137-52f3-4c84-b574-df173011600e"
```

## 🔧 Configuring GitHub Secrets

### Using GitHub UI:
1. Navigate to your repository
2. Go to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add each secret with the name and value from above

### Using GitHub CLI:
```bash
# Azure credentials
gh secret set AZURE_CREDENTIALS --body '{
  "clientId": "your-client-id",
  "clientSecret": "your-client-secret",
  "subscriptionId": "850ca137-52f3-4c84-b574-df173011600e",
  "tenantId": "your-tenant-id"
}'

gh secret set AZURE_SUBSCRIPTION_ID --body "850ca137-52f3-4c84-b574-df173011600e"
gh secret set ARM_CLIENT_ID --body "your-client-id"
gh secret set ARM_CLIENT_SECRET --body "your-client-secret"
gh secret set ARM_TENANT_ID --body "your-tenant-id"

# Security tools
gh secret set SNYK_TOKEN --body "your-snyk-token"
gh secret set SONAR_TOKEN --body "your-sonar-token"
gh secret set GITGUARDIAN_API_KEY --body "your-gitguardian-key"

# Notifications (optional)
gh secret set SLACK_WEBHOOK_URL --body "your-slack-webhook-url"
```

## 🏗️ Environment Configuration

### GitHub Environments

Create the following environments in your repository:

#### 1. Staging Environment
- **Name:** `staging`
- **Protection rules:** None (automatic deployment)
- **Environment secrets:** None (uses repository secrets)

#### 2. Production Environment
- **Name:** `production`
- **Protection rules:**
  - Required reviewers: 1-2 team members
  - Wait timer: 5 minutes
  - Deployment branches: `main` only
- **Environment secrets:** None (uses repository secrets)

### Setting Up Environments:
```bash
# Using GitHub CLI
gh api repos/:owner/:repo/environments/staging --method PUT --field wait_timer=0
gh api repos/:owner/:repo/environments/production --method PUT --field wait_timer=300

# Add protection rules for production
gh api repos/:owner/:repo/environments/production/deployment-protection-rules --method POST \
  --field type="required_reviewers" \
  --field reviewers='[{"type":"User","id":YOUR_USER_ID}]'
```

## 🧪 Testing the Configuration

### 1. Validate Azure Connection
```bash
# Test Azure CLI authentication
az account show

# Test service principal login
az login --service-principal \
  --username $ARM_CLIENT_ID \
  --password $ARM_CLIENT_SECRET \
  --tenant $ARM_TENANT_ID
```

### 2. Test Security Tools
```bash
# Test Snyk
snyk auth $SNYK_TOKEN
snyk test

# Test SonarCloud (requires project setup)
# Follow SonarCloud documentation for project configuration
```

### 3. Validate Pipeline Access
```bash
# Test GitHub Actions can access secrets
# Push a simple workflow that echoes masked secret values
```

## 🔒 Security Best Practices

### Secret Management:
- **Rotate secrets** regularly (every 90 days)
- **Use least privilege** principle for permissions
- **Monitor secret usage** in audit logs
- **Never commit secrets** to version control

### Service Principal Security:
- **Enable MFA** for admin accounts
- **Use certificate authentication** instead of secrets when possible
- **Regularly audit** role assignments
- **Implement conditional access** policies

### Pipeline Security:
- **Pin action versions** to specific commits
- **Review third-party actions** before use
- **Enable branch protection** rules
- **Require status checks** before merging

## 📊 Monitoring and Auditing

### Azure Activity Logs:
```bash
# Monitor service principal activity
az monitor activity-log list \
  --caller $ARM_CLIENT_ID \
  --start-time 2024-01-01T00:00:00Z

# Check role assignments
az role assignment list --assignee $ARM_CLIENT_ID
```

### GitHub Audit:
- **Actions usage** - Monitor workflow runs and costs
- **Secret access** - Review which workflows access secrets
- **Repository access** - Monitor who has access to secrets

## 🆘 Troubleshooting

### Common Issues:

#### Authentication Failures:
```bash
# Verify service principal exists
az ad sp show --id $ARM_CLIENT_ID

# Check role assignments
az role assignment list --assignee $ARM_CLIENT_ID

# Test permissions
az resource list --resource-group rg-containerapp-staging
```

#### Secret Access Issues:
```bash
# Verify secret is set correctly
gh secret list

# Check environment configuration
gh api repos/:owner/:repo/environments
```

#### Permission Errors:
```bash
# Check required permissions
az provider show --namespace Microsoft.App
az provider show --namespace Microsoft.ContainerRegistry

# Register providers if needed
az provider register --namespace Microsoft.App
```

## 📞 Support

If you encounter issues:

1. **Check the troubleshooting section** above
2. **Review GitHub Actions logs** for detailed error messages
3. **Verify Azure permissions** using the validation commands
4. **Contact the DevOps team** for assistance

---

**Security Note:** Never share or commit actual secret values. This template is for structure reference only.
