output "container_app_url" {
  description = "Container App URL"
  value       = "https://${azurerm_container_app.app.latest_revision_fqdn}"
}

output "container_app_fqdn" {
  description = "Container App FQDN"
  value       = azurerm_container_app.app.latest_revision_fqdn
}