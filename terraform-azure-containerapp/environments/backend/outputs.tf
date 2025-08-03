output "backend_url" {
  description = "URL of the backend container app"
  value       = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.backend.name
}

output "application_insights_connection_string" {
  description = "Application Insights connection string"
  value       = azurerm_application_insights.backend.connection_string
  sensitive   = true
}
