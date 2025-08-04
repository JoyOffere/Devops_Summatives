# Import script for existing Azure resources into Terraform state (Production)
# Run this script after 'az login' and 'terraform init'

Write-Host "🔄 Importing existing Azure resources into Terraform state (Production)..." -ForegroundColor Yellow

# Import Resource Group
Write-Host "📁 Importing Resource Group..." -ForegroundColor Cyan
terraform import azurerm_resource_group.main /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg

# Import Container Registry
Write-Host "📦 Importing Container Registry..." -ForegroundColor Cyan
terraform import module.container_registry.azurerm_container_registry.acr /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.ContainerRegistry/registries/scholardormproductionacr

# Import Application Insights
Write-Host "📊 Importing Application Insights..." -ForegroundColor Cyan
terraform import azurerm_application_insights.main /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.Insights/components/scholardorm-production-insights

# Import Log Analytics Workspace
Write-Host "📋 Importing Log Analytics Workspace..." -ForegroundColor Cyan
terraform import azurerm_log_analytics_workspace.main /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.OperationalInsights/workspaces/scholardorm-production-logs

# Import Monitor Action Group
Write-Host "🚨 Importing Monitor Action Group..." -ForegroundColor Cyan
terraform import azurerm_monitor_action_group.main /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.Insights/actionGroups/scholardorm-production-alerts

# Import Monitor Metric Alerts
Write-Host "⚠️ Importing Monitor Metric Alerts..." -ForegroundColor Cyan
terraform import azurerm_monitor_metric_alert.response_time /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.Insights/metricAlerts/scholardorm-production-high-response-time
terraform import azurerm_monitor_metric_alert.error_rate /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.Insights/metricAlerts/scholardorm-production-high-error-rate

# Import Container App (if it exists)
Write-Host "🚀 Importing Container App..." -ForegroundColor Cyan
terraform import module.container_app.azurerm_container_app.app /subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/scholardorm-production-rg/providers/Microsoft.App/containerApps/scholardorm-production

Write-Host "✅ Import completed! Run 'terraform plan' to verify." -ForegroundColor Green
Write-Host "Note: Some resources might not exist or have different names. Check Azure portal for exact names." -ForegroundColor Yellow
