# Use existing container registry if specified
data "azurerm_container_registry" "existing" {
  count               = var.use_existing_registry ? 1 : 0
  name                = var.registry_name
  resource_group_name = var.resource_group_name
}

# Create new container registry if not using existing one
resource "azurerm_container_registry" "acr" {
  count               = var.use_existing_registry ? 0 : 1
  name                = var.registry_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = var.sku  # Use variable for SKU
  admin_enabled       = true

  # Basic settings for cost optimization
  public_network_access_enabled = true
  
  tags = var.tags
}

# Local values to reference the registry regardless of how it's sourced
locals {
  registry_id           = var.use_existing_registry ? data.azurerm_container_registry.existing[0].id : azurerm_container_registry.acr[0].id
  registry_login_server = var.use_existing_registry ? data.azurerm_container_registry.existing[0].login_server : azurerm_container_registry.acr[0].login_server
  registry_admin_username = var.use_existing_registry ? data.azurerm_container_registry.existing[0].admin_username : azurerm_container_registry.acr[0].admin_username
  registry_admin_password = var.use_existing_registry ? data.azurerm_container_registry.existing[0].admin_password : azurerm_container_registry.acr[0].admin_password
}