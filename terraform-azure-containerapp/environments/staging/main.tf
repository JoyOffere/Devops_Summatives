terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "850ca137-52f3-4c84-b574-df173011600e"
}

# Locals for unique naming
locals {
  environment = "staging"
  name_prefix = "${var.app_name}-${local.environment}"
  common_tags = {
    Environment = local.environment
    Project     = var.app_name
    ManagedBy   = "terraform"
  }
}

resource "azurerm_resource_group" "staging" {
  name     = "rg-containerapp-staging"  # Keep existing name
  location = var.location
  tags     = local.common_tags
}

# Application Insights - Basic tier (cheapest)
resource "azurerm_application_insights" "staging" {
  name                = "scholardorm-staging-insights-staging"  # Updated to scholardorm
  location            = azurerm_resource_group.staging.location
  resource_group_name = azurerm_resource_group.staging.name
  application_type    = "web"
  daily_data_cap_in_gb = 1  # Limit daily data ingestion to 1GB (free tier)
  tags                = local.common_tags
}

# Log Analytics Workspace - Free tier
resource "azurerm_log_analytics_workspace" "staging" {
  name                = "scholardorm-staging-logs-staging"  # Updated to scholardorm
  location            = azurerm_resource_group.staging.location
  resource_group_name = azurerm_resource_group.staging.name
  sku                = "PerGB2018"
  retention_in_days   = 30     # Minimum allowed retention (cheapest)
  daily_quota_gb      = 0.5    # Limit daily quota to 500MB
  tags                = local.common_tags
}

# Action Group for alerts
resource "azurerm_monitor_action_group" "staging" {
  name                = "scholardorm-staging-alerts-staging"  # Updated to scholardorm
  resource_group_name = azurerm_resource_group.staging.name
  short_name          = "stagealerts"

  email_receiver {
    name          = "admin"
    email_address = var.alert_email
  }

  tags = local.common_tags
}

# Single alert to minimize costs
resource "azurerm_monitor_metric_alert" "response_time" {
  name                = "scholardorm-staging-high-response-time"  # Updated to scholardorm
  resource_group_name = azurerm_resource_group.staging.name
  scopes              = [azurerm_application_insights.staging.id]
  description         = "Alert when response time is too high"
  severity            = 2  # Keep original severity
  frequency           = "PT1M"  # Keep original frequency
  window_size         = "PT5M" # Keep original window

  criteria {
    metric_namespace = "microsoft.insights/components"
    metric_name      = "requests/duration"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 1000  # Keep original threshold
  }

  action {
    action_group_id = azurerm_monitor_action_group.staging.id
  }

  tags = local.common_tags
}

# Container Registry - Keep existing settings
module "container_registry" {
  source              = "../../modules/container-registry"
  resource_group_name = azurerm_resource_group.staging.name
  location           = azurerm_resource_group.staging.location
  registry_name      = "acrcontainerappstaging"  # Keep existing name
  environment        = local.environment
  sku                = "Standard"  # Keep existing SKU to avoid replacement
  tags               = local.common_tags
}

# Use existing shared Container App Environment
locals {
  shared_environment_id = "/subscriptions/850ca137-52f3-4c84-b574-df173011600e/resourceGroups/rg-containerapp-staging/providers/Microsoft.App/managedEnvironments/scholardorm-staging-env"
}

# Frontend Container App (microservices)
module "frontend_app" {
  source                     = "../../modules/container-app"
  resource_group_name        = azurerm_resource_group.staging.name
  location                  = azurerm_resource_group.staging.location
  app_name                  = var.app_name
  image_name                = var.image_name
  frontend_image            = var.frontend_image
  backend_image             = null  # Frontend only
  frontend_only             = true
  shared_environment_id     = local.shared_environment_id
  container_registry_url    = module.container_registry.registry_url
  registry_username         = module.container_registry.admin_username
  registry_password         = module.container_registry.admin_password
  environment               = local.environment
  environment_variables     = merge(var.environment_variables, {
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.staging.connection_string
  })
  cpu                       = var.cpu
  memory                    = var.memory
  min_replicas              = 0   # Scale to zero when not in use
  max_replicas              = 2   # Limit max replicas
  log_analytics_workspace_id = azurerm_log_analytics_workspace.staging.id
  tags                      = local.common_tags
}

# Backend Container App (microservices)
module "backend_app" {
  count                      = var.frontend_only ? 0 : 1
  source                     = "../../modules/container-app"
  resource_group_name        = azurerm_resource_group.staging.name
  location                  = azurerm_resource_group.staging.location
  app_name                  = "scholardorm-backend"
  image_name                = "scholardorm-backend"
  frontend_image            = null  # Backend only
  backend_image             = var.backend_image
  frontend_only             = false
  target_port               = 5000  # Backend port
  shared_environment_id     = local.shared_environment_id
  container_registry_url    = module.container_registry.registry_url
  registry_username         = module.container_registry.admin_username
  registry_password         = module.container_registry.admin_password
  environment               = local.environment
  environment_variables     = merge(var.environment_variables, {
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.staging.connection_string
  })
  cpu                       = var.cpu
  memory                    = var.memory
  min_replicas              = 0   # Scale to zero when not in use
  max_replicas              = 2   # Limit max replicas
  log_analytics_workspace_id = azurerm_log_analytics_workspace.staging.id
  tags                      = local.common_tags
}