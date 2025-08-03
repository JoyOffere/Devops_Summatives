# Configure Terraform
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# Local variables
locals {
  environment  = "staging"
  common_tags = {
    Environment = local.environment
    Project     = "scholardorm-backend"
    ManagedBy   = "terraform"
  }
}

# Resource Group
resource "azurerm_resource_group" "backend" {
  name     = "rg-containerapp-backend"
  location = var.location
  tags     = local.common_tags
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "backend" {
  name                = "scholardorm-backend-logs"
  location           = azurerm_resource_group.backend.location
  resource_group_name = azurerm_resource_group.backend.name
  sku                = "PerGB2018"
  retention_in_days  = 30
  tags               = local.common_tags
}

# Application Insights
resource "azurerm_application_insights" "backend" {
  name                = "scholardorm-backend-insights"
  location           = azurerm_resource_group.backend.location
  resource_group_name = azurerm_resource_group.backend.name
  application_type   = "web"
  workspace_id       = azurerm_log_analytics_workspace.backend.id
  tags               = local.common_tags
}

# Use existing Container App Environment from staging
data "azurerm_container_app_environment" "staging" {
  name                = "scholardorm-staging-env"
  resource_group_name = "rg-containerapp-staging"
}

# Container App for Backend
resource "azurerm_container_app" "backend" {
  name                         = "scholardorm-backend"
  container_app_environment_id = data.azurerm_container_app_environment.staging.id
  resource_group_name          = azurerm_resource_group.backend.name
  revision_mode                = "Single"
  tags                         = local.common_tags

  template {
    min_replicas = 0
    max_replicas = 2

    container {
      name   = "scholardorm-backend"
      image  = var.backend_image
      cpu    = var.cpu
      memory = var.memory

      dynamic "env" {
        for_each = merge(var.environment_variables, {
          "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.backend.connection_string
        })
        content {
          name  = env.key
          value = env.value
        }
      }
    }
  }

  registry {
    server               = var.registry_server
    username             = var.registry_username
    password_secret_name = "registry-password"
  }

  secret {
    name  = "registry-password"
    value = var.registry_password
  }

  ingress {
    allow_insecure_connections = false
    external_enabled          = true
    target_port              = 5000
    traffic_weight {
      latest_revision = true
      percentage     = 100
    }
  }
}
