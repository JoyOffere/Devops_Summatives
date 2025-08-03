resource "azurerm_container_app_environment" "env" {
  name                = "${var.app_name}-${var.environment}-env"
  location            = var.location
  resource_group_name = var.resource_group_name
}

resource "azurerm_container_app" "app" {
  name                         = "${var.app_name}-${var.environment}"
  container_app_environment_id = azurerm_container_app_environment.env.id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"

  template {
    container {
      name   = var.app_name
      image  = "${var.container_registry_url}/${var.image_name}:latest"
      cpu    = var.cpu
      memory = var.memory

      dynamic "env" {
        for_each = var.environment_variables
        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 80
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }
}