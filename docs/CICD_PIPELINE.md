# CI/CD Pipeline Documentation

This repository contains a comprehensive CI/CD pipeline system for the ScholarDorm application, implementing DevOps best practices including security scanning, infrastructure as code, automated testing, and monitoring.

## 🚀 Pipeline Overview

The CI/CD system consists of four main workflows:

1. **[Main CI/CD Pipeline](#main-cicd-pipeline)** - Complete application deployment
2. **[Security Pipeline](#security-pipeline)** - Comprehensive security scanning
3. **[Infrastructure Pipeline](#infrastructure-pipeline)** - Terraform infrastructure management
4. **[Monitoring Pipeline](#monitoring-pipeline)** - Health checks and performance monitoring

## 📋 Prerequisites

### Required Secrets

Configure the following secrets in your GitHub repository:

```bash
# Azure Credentials
AZURE_CREDENTIALS          # Service principal credentials (JSON)
AZURE_SUBSCRIPTION_ID      # Azure subscription ID
ARM_CLIENT_ID              # Service principal client ID
ARM_CLIENT_SECRET          # Service principal client secret
ARM_TENANT_ID              # Azure tenant ID

# Security Tools
SNYK_TOKEN                 # Snyk API token for vulnerability scanning
SONAR_TOKEN               # SonarCloud token for code quality
GITGUARDIAN_API_KEY       # GitGuardian API key for secret scanning

# Notifications (Optional)
SLACK_WEBHOOK_URL         # Slack webhook for notifications
```

### Required Tools

The pipelines automatically install and configure:
- Node.js 20
- Docker & Docker Buildx
- Terraform 1.5.0
- Azure CLI
- Security scanning tools (Trivy, Checkov, TFSec)

## 🔄 Main CI/CD Pipeline

**File:** `.github/workflows/cicd-pipeline.yml`

### Triggers
- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual workflow dispatch

### Pipeline Stages

#### 1. Security & Code Quality Scan
- **Trivy** filesystem vulnerability scanning
- **Snyk** dependency vulnerability scanning
- **ESLint** code quality for frontend/backend
- Results uploaded to GitHub Security tab

#### 2. Infrastructure Security Scan
- **Checkov** Terraform security scanning
- **Terraform** format and validation checks
- Results uploaded as SARIF reports

#### 3. Build and Test Applications
- **Matrix strategy** for frontend/backend
- **Node.js testing** with Jest
- **Build artifacts** generation
- **Test results** and coverage reports

#### 4. Container Image Build and Scan
- **Multi-arch Docker builds** with BuildKit
- **Trivy container** vulnerability scanning
- **Image optimization** and caching
- **Artifact storage** for deployment

#### 5. Deploy to Staging
- **Terraform infrastructure** provisioning
- **Container registry** image pushing
- **Azure Container Apps** deployment
- **Integration testing** and health checks

#### 6. Deploy to Production
- **Production approval** required
- **Blue-green deployment** strategy
- **Health verification** before traffic routing
- **Rollback capability** on failure

### Usage Examples

```bash
# Automatic deployment on main branch
git push origin main

# Manual deployment to specific environment
# Use GitHub UI: Actions > CI/CD Pipeline > Run workflow
# Select environment: staging/production
```

## 🔒 Security Pipeline

**File:** `.github/workflows/security-scan.yml`

### Triggers
- Daily at 2 AM UTC
- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch

### Security Scanning Components

#### 1. SAST (Static Application Security Testing)
```yaml
- CodeQL Analysis (GitHub native)
- SonarCloud integration
- Pattern-based vulnerability detection
```

#### 2. Dependency Vulnerability Scanning
```yaml
- npm audit for Node.js dependencies
- OWASP Dependency Check
- Snyk vulnerability database
- Automated CVE reporting
```

#### 3. Infrastructure Security
```yaml
- Checkov policy-as-code scanning
- TFSec Terraform security analysis
- Azure Security Center integration
- Compliance reporting
```

#### 4. Container Security
```yaml
- Trivy container image scanning
- Grype vulnerability assessment
- Docker Scout CVE analysis
- Base image security validation
```

#### 5. Secret Detection
```yaml
- TruffleHog secret scanning
- GitGuardian integration
- Pattern matching for API keys
- Credential exposure prevention
```

### Security Compliance Features

- **SARIF format** for security findings
- **GitHub Security tab** integration
- **Automated issue creation** for critical findings
- **Compliance reporting** for audit trails

## 🏗️ Infrastructure Pipeline

**File:** `.github/workflows/infrastructure-pipeline.yml`

### Triggers
- Changes to `terraform-azure-containerapp/**`
- Pull requests affecting infrastructure
- Manual workflow dispatch with environment selection

### Infrastructure Management Features

#### 1. Terraform Validation
```bash
terraform fmt -check -recursive
terraform init -backend=false
terraform validate
```

#### 2. Security Scanning
```bash
# Multiple security tools
checkov --framework terraform
tfsec --format sarif
terraform-compliance
```

#### 3. Plan Generation
```bash
# Environment-specific planning
terraform plan -out=env.tfplan -detailed-exitcode
```

#### 4. Controlled Deployment
```bash
# Approval gates for production
terraform apply -auto-approve env.tfplan
```

#### 5. Drift Detection
```bash
# Scheduled infrastructure drift monitoring
terraform plan -detailed-exitcode
# Automatic issue creation for drift
```

### Terraform Best Practices

- **State management** with Azure Storage
- **Environment isolation** (staging/production)
- **Variable validation** and type checking
- **Output documentation** for integrations
- **Resource tagging** for cost management

## 📊 Monitoring Pipeline

**File:** `.github/workflows/monitoring.yml`

### Triggers
- Every 15 minutes (health checks)
- Daily at 6 AM UTC (comprehensive reports)
- Manual workflow dispatch

### Monitoring Components

#### 1. Health Checks
```bash
# Application availability
curl -f $FRONTEND_URL
curl -f $BACKEND_URL/api/health

# Response time monitoring
curl -w "%{time_total}" $APP_URL

# SSL certificate validation
openssl s_client -connect $HOST:443
```

#### 2. Azure Resource Monitoring
```bash
# Container App status
az containerapp list --query "[].{Name:name, Status:properties.runningStatus}"

# Registry health
az acr show --query "{Name:name, Status:provisioningState}"

# Application Insights metrics
az monitor metrics list --metric "requests/count"
```

#### 3. Performance Testing
```bash
# Artillery load testing
artillery run load-test.yml
artillery report results.json
```

#### 4. Alerting System
```yaml
- GitHub issue creation for failures
- Slack/Teams notifications
- Performance threshold monitoring
- SSL certificate expiration alerts
```

## 🛠️ Environment Configuration

### Staging Environment
```yaml
Frontend: https://scholardorm-frontend-staging.gentlemeadow-49027184.eastus.azurecontainerapps.io
Backend:  https://scholardorm-backend-staging.gentlemeadow-49027184.eastus.azurecontainerapps.io
Registry: acrcontainerappstaging.azurecr.io
Resource Group: rg-containerapp-staging
```

### Production Environment
```yaml
Frontend: https://scholardorm-frontend-production.gentlemeadow-49027184.eastus.azurecontainerapps.io
Backend:  https://scholardorm-production.gentlemeadow-49027184.eastus.azurecontainerapps.io
Registry: scholardormproductionacr.azurecr.io
Resource Group: scholardorm-production-rg
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Pipeline Failures
```bash
# Check workflow logs
gh run list --workflow=cicd-pipeline.yml
gh run view <run-id>

# Rerun failed jobs
gh run rerun <run-id>
```

#### 2. Security Scan Failures
```bash
# Review security findings
# Navigate to: Security > Code scanning alerts
# Address high/critical vulnerabilities
```

#### 3. Infrastructure Drift
```bash
# Check drift detection issues
# Review Terraform plan output
# Apply corrections: terraform plan && terraform apply
```

#### 4. Health Check Failures
```bash
# Check application logs
az containerapp logs show --name <app-name> --resource-group <rg-name>

# Verify container status
az containerapp show --name <app-name> --resource-group <rg-name>
```

### Manual Operations

#### Force Rebuild Images
```bash
# Trigger manual workflow
gh workflow run cicd-pipeline.yml

# Or via GitHub UI
# Actions > CI/CD Pipeline > Run workflow
```

#### Emergency Rollback
```bash
# Revert to previous image
az containerapp update \
  --name <app-name> \
  --resource-group <rg-name> \
  --image <registry>/<image>:<previous-tag>
```

#### Infrastructure Recovery
```bash
# Import existing resources
terraform import <resource-type>.<name> <azure-resource-id>

# Restore from backup
terraform apply -backup=terraform.tfstate.backup
```

## 📈 Metrics and Monitoring

### Key Performance Indicators (KPIs)

- **Deployment Frequency:** Multiple per day
- **Lead Time:** < 30 minutes from commit to production
- **Mean Time to Recovery (MTTR):** < 15 minutes
- **Change Failure Rate:** < 5%

### Monitoring Dashboards

Access monitoring data through:
- **GitHub Actions:** Workflow run history and metrics
- **Azure Monitor:** Application performance and infrastructure
- **Application Insights:** Request tracing and error rates
- **Container Insights:** Container resource utilization

## 🚀 Getting Started

1. **Fork/Clone** this repository
2. **Configure secrets** in repository settings
3. **Set up Azure** service principal with appropriate permissions
4. **Push changes** to trigger initial pipeline run
5. **Monitor deployment** through GitHub Actions interface

## 📚 Additional Resources

- [Azure Container Apps Documentation](https://docs.microsoft.com/en-us/azure/container-apps/)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Security Best Practices](https://docs.github.com/en/code-security)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test locally
3. Run security scans: `npm audit && terraform validate`
4. Submit pull request with description
5. Wait for automated checks to pass
6. Request review from team members

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Last Updated:** $(date)
**Pipeline Version:** v1.0.0
**Maintained by:** DevOps Team
