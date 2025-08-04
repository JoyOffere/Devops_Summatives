# Script to list existing Azure resources that should be imported
# Run this after 'az login' to verify resource names and IDs

Write-Host "🔍 Checking existing Azure resources..." -ForegroundColor Yellow

Write-Host "`n📁 Resource Groups:" -ForegroundColor Cyan
az group list --query "[?contains(name, 'staging') || contains(name, 'production')].{Name:name, Location:location}" --output table

Write-Host "`n📦 Container Registries:" -ForegroundColor Cyan
az acr list --query "[].{Name:name, ResourceGroup:resourceGroup, LoginServer:loginServer}" --output table

Write-Host "`n🚀 Container Apps:" -ForegroundColor Cyan
az containerapp list --query "[].{Name:name, ResourceGroup:resourceGroup, FQDN:properties.configuration.ingress.fqdn}" --output table

Write-Host "`n🌐 Container App Environments:" -ForegroundColor Cyan
az containerapp env list --query "[].{Name:name, ResourceGroup:resourceGroup, Location:location}" --output table

Write-Host "`n📊 Application Insights:" -ForegroundColor Cyan
az monitor app-insights component show --query "[].{Name:name, ResourceGroup:resourceGroup, ApplicationType:applicationType}" --output table

Write-Host "`n📋 Log Analytics Workspaces:" -ForegroundColor Cyan
az monitor log-analytics workspace list --query "[].{Name:name, ResourceGroup:resourceGroup, Location:location}" --output table

Write-Host "`n✅ Resource discovery complete!" -ForegroundColor Green
Write-Host "Use the exact names from above in your import commands." -ForegroundColor Yellow
