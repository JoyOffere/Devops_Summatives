output "resource_group_name" {
  description = "Name of the resource group"
  value       = data.azurerm_resource_group.staging.name
}

output "application_insights_connection_string" {
  description = "Application Insights connection string"
  value       = azurerm_application_insights.staging.connection_string
  sensitive   = true
}

output "application_insights_instrumentation_key" {
  description = "Application Insights instrumentation key"
  value       = azurerm_application_insights.staging.instrumentation_key
  sensitive   = true
}

output "container_app_url" {
  description = "Frontend Container App URL"
  value       = module.frontend_app.container_app_url
}

output "backend_app_url" {
  description = "Backend Container App URL"
  value       = var.frontend_only ? null : module.backend_app[0].container_app_url
}

output "container_registry_url" {
  description = "Container Registry URL"
  value       = module.container_registry.registry_url
}

output "container_registry_admin_username" {
  description = "Container Registry admin username"
  value       = module.container_registry.admin_username
  sensitive   = true
}

output "container_registry_admin_password" {
  description = "Container Registry admin password"
  value       = module.container_registry.admin_password
  sensitive   = true
}