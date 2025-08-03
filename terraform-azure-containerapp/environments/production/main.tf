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
  environment = "production"
  name_prefix = "${var.app_name}-${local.environment}"
  common_tags = {
    Environment = local.environment
    Project     = var.app_name
    ManagedBy   = "terraform"
  }
}

# Use existing resource group if it exists, otherwise create new one
# Check if resource group exists first and use data source if it does
data "azurerm_resource_group" "existing" {
  count = var.use_existing_resource_group ? 1 : 0
  name  = var.resource_group_name
}

resource "azurerm_resource_group" "main" {
  count    = var.use_existing_resource_group ? 0 : 1
  name     = var.resource_group_name  # Use explicit name from tfvars
  location = var.location
  tags     = local.common_tags
}

# Local to reference the resource group regardless of how it's sourced
locals {
  resource_group_name = var.use_existing_resource_group ? data.azurerm_resource_group.existing[0].name : azurerm_resource_group.main[0].name
  location           = var.use_existing_resource_group ? data.azurerm_resource_group.existing[0].location : azurerm_resource_group.main[0].location
}

# Application Insights for monitoring
resource "azurerm_application_insights" "main" {
  name                = "${local.name_prefix}-insights"
  location            = local.location
  resource_group_name = local.resource_group_name
  application_type    = "web"
  tags                = local.common_tags
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "main" {
  name                = "${local.name_prefix}-logs"
  location            = local.location
  resource_group_name = local.resource_group_name
  sku                = "PerGB2018"
  retention_in_days   = 90  # Longer retention for production
  tags                = local.common_tags
}

# Action Group for alerts
resource "azurerm_monitor_action_group" "main" {
  name                = "${local.name_prefix}-alerts"
  resource_group_name = local.resource_group_name
  short_name          = "prod-alerts"

  email_receiver {
    name          = "admin"
    email_address = var.alert_email
  }

  tags = local.common_tags
}

# Alert for High Response Time (stricter for production)
resource "azurerm_monitor_metric_alert" "response_time" {
  name                = "${local.name_prefix}-high-response-time"
  resource_group_name = local.resource_group_name
  scopes              = [azurerm_application_insights.main.id]
  description         = "Alert when response time is too high"
  severity            = 1  # Higher severity for production
  frequency           = "PT1M"
  window_size         = "PT5M"

  criteria {
    metric_namespace = "microsoft.insights/components"
    metric_name      = "requests/duration"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 500  # Lower threshold for production
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }

  tags = local.common_tags
}

# Additional alert for error rate in production
resource "azurerm_monitor_metric_alert" "error_rate" {
  name                = "${local.name_prefix}-high-error-rate"
  resource_group_name = local.resource_group_name
  scopes              = [azurerm_application_insights.main.id]
  description         = "Alert when error rate is too high"
  severity            = 1
  frequency           = "PT1M"
  window_size         = "PT5M"

  criteria {
    metric_namespace = "microsoft.insights/components"
    metric_name      = "requests/failed"
    aggregation      = "Count"
    operator         = "GreaterThan"
    threshold        = 3
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }

  tags = local.common_tags
}

module "container_registry" {
  source              = "../../modules/container-registry"
  resource_group_name = local.resource_group_name
  location           = local.location
  registry_name      = var.container_registry_name  # Use explicit name from tfvars
  environment        = local.environment
  tags               = local.common_tags
}

# Reference existing staging environment to avoid regional limit
data "azurerm_container_app_environment" "shared" {
  name                = "scholardorm-staging-env"
  resource_group_name = "rg-containerapp-staging"
}

module "container_app" {
  source                     = "../../modules/container-app"
  resource_group_name        = local.resource_group_name
  location                  = local.location
  app_name                  = var.app_name
  image_name                = var.image_name
  container_registry_url    = module.container_registry.registry_url
  registry_username         = module.container_registry.admin_username
  registry_password         = module.container_registry.admin_password
  environment               = local.environment
  shared_environment_id     = data.azurerm_container_app_environment.shared.id
  environment_variables     = merge(var.environment_variables, {
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.main.connection_string
  })
  cpu                       = var.cpu
  memory                    = var.memory
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  tags                      = local.common_tags
}