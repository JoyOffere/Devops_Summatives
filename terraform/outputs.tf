# Azure Infrastructure Outputs
output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}

output "container_registry_name" {
  description = "Name of the Azure Container Registry"
  value       = azurerm_container_registry.main.name
}

output "container_registry_login_server" {
  description = "Login server for the Azure Container Registry"
  value       = azurerm_container_registry.main.login_server
}

output "backend_url" {
  description = "URL of the backend container app"
  value       = "https://${azurerm_container_app.backend.latest_revision_fqdn}"
}

output "frontend_url" {
  description = "URL of the frontend container app"
  value       = "https://${azurerm_container_app.frontend.latest_revision_fqdn}"
}

output "container_app_environment_id" {
  description = "ID of the Container App Environment"
  value       = local.container_app_environment_id
}
