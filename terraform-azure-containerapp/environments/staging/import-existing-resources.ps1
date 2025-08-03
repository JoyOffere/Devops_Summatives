# Import script for existing Azure resources into Terraform state
# Run this script after 'az login' and 'terraform init'

Write-Host "🔄 Importing existing Azure resources into Terraform state..." -ForegroundColor Yellow

# Import Resource Group (using data source now, so no import needed)
Write-Host "✓ Resource Group: Using data source (no import needed)" -ForegroundColor Green

# Import Container Registry
Write-Host "📦 Importing Container Registry..." -ForegroundColor Cyan
terraform import module.container_registry.azurerm_container_registry.acr /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.ContainerRegistry/registries/acrcontainerappstaging

# Import Application Insights
Write-Host "📊 Importing Application Insights..." -ForegroundColor Cyan
terraform import azurerm_application_insights.staging /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.Insights/components/scholardorm-staging-insights-staging

# Import Log Analytics Workspace
Write-Host "📋 Importing Log Analytics Workspace..." -ForegroundColor Cyan
terraform import azurerm_log_analytics_workspace.staging /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.OperationalInsights/workspaces/scholardorm-staging-logs-staging

# Import Monitor Action Group
Write-Host "🚨 Importing Monitor Action Group..." -ForegroundColor Cyan
terraform import azurerm_monitor_action_group.staging /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.Insights/actionGroups/scholardorm-staging-alerts-staging

# Import Monitor Metric Alert
Write-Host "⚠️ Importing Monitor Metric Alert..." -ForegroundColor Cyan
terraform import azurerm_monitor_metric_alert.response_time /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.Insights/metricAlerts/scholardorm-staging-high-response-time

# Import Container Apps (if they exist)
Write-Host "🚀 Importing Frontend Container App..." -ForegroundColor Cyan
terraform import module.frontend_app.azurerm_container_app.app /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.App/containerApps/scholardorm-frontend-staging

Write-Host "🚀 Importing Backend Container App..." -ForegroundColor Cyan
terraform import module.backend_app[0].azurerm_container_app.app /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.App/containerApps/scholardorm-backend-staging

Write-Host "✅ Import completed! Run 'terraform plan' to verify." -ForegroundColor Green
Write-Host "Note: Some resources might not exist or have different names. Check Azure portal for exact names." -ForegroundColor Yellow
