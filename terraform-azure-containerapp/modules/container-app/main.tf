# Use existing container app environment if specified
data "azurerm_container_app_environment" "existing" {
  count               = var.use_existing_container_environment ? 1 : 0
  name                = var.existing_container_environment_name
  resource_group_name = var.resource_group_name
}

# Container App Environment - only create if not using shared environment or existing environment
resource "azurerm_container_app_environment" "env" {
  count                      = var.shared_environment_id != null || var.use_existing_container_environment ? 0 : 1
  name                       = "${var.app_name}-${var.environment}-env"
  location                   = var.location
  resource_group_name        = var.resource_group_name
  log_analytics_workspace_id = var.log_analytics_workspace_id
  tags                       = var.tags
}

# Local value to determine which environment ID to use
locals {
  container_app_environment_id = var.shared_environment_id != null ? var.shared_environment_id : (
    var.use_existing_container_environment ? data.azurerm_container_app_environment.existing[0].id : azurerm_container_app_environment.env[0].id
  )
}

resource "azurerm_container_app" "app" {
  name                         = "${var.app_name}-${var.environment}"
  container_app_environment_id = local.container_app_environment_id
  resource_group_name          = var.resource_group_name
  revision_mode                = "Single"
  tags                         = var.tags

  template {
    min_replicas = var.min_replicas  # Can scale to 0 to save costs
    max_replicas = var.max_replicas

    # Only include backend container if backend_image is provided and we're not in frontend-only mode
    dynamic "container" {
      for_each = var.backend_image != null && var.frontend_only != true ? [1] : []
      content {
        name   = "${var.app_name}-backend"
        image  = var.backend_image
        cpu    = var.cpu         # 0.25 vCPU minimum
        memory = var.memory      # 0.5Gi minimum

        dynamic "env" {
          for_each = var.environment_variables
          content {
            name  = env.key
            value = env.value
          }
        }
      }
    }

    # Only include frontend container if frontend_image is provided and we're not in backend-only mode
    dynamic "container" {
      for_each = var.frontend_image != null ? [1] : []
      content {
        name   = "${var.app_name}-frontend"
        image  = var.frontend_image
        cpu    = var.cpu         # 0.25 vCPU minimum
        memory = var.memory      # 0.5Gi minimum

        dynamic "env" {
          for_each = var.environment_variables
          content {
            name  = env.key
            value = env.value
          }
        }
      }
    }
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = var.target_port

    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
  }

  registry {
    server   = var.container_registry_url
    username = var.registry_username
    password_secret_name = "registry-password"
  }

  secret {
    name  = "registry-password"
    value = var.registry_password
  }
}