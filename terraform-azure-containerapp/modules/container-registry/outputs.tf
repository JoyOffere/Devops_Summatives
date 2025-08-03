output "registry_url" {
  description = "The URL of the container registry"
  value       = local.registry_login_server
}

output "registry_name" {
  description = "The name of the container registry"
  value       = var.registry_name
}

output "admin_username" {
  description = "The admin username for the container registry"
  value       = local.registry_admin_username
}

output "admin_password" {
  description = "The admin password for the container registry"
  value       = local.registry_admin_password
  sensitive   = true
}