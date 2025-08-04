output "registry_url" {
  description = "The URL of the container registry"
  value       = azurerm_container_registry.acr.login_server
}

output "registry_name" {
  description = "The name of the container registry"
  value       = azurerm_container_registry.acr.name
}

output "admin_username" {
  description = "The admin username for the container registry"
  value       = azurerm_container_registry.acr.admin_username
}

output "admin_password" {
  description = "The admin password for the container registry"
  value       = azurerm_container_registry.acr.admin_password
  sensitive   = true
}