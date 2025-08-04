resource "azurerm_container_registry" "acr" {
  name                = var.registry_name
  resource_group_name = var.resource_group_name
  location            = var.location
  sku                 = var.sku  # Use variable for SKU
  admin_enabled       = true

  # Basic settings for cost optimization
  public_network_access_enabled = true
  
  tags = var.tags
}