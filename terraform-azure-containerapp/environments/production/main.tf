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

resource "azurerm_resource_group" "main" {
  name     = "scholardorm-production-rg"  # Match existing resource name
  location = var.location
  tags     = local.common_tags
}

# Application Insights for monitoring
resource "azurerm_application_insights" "main" {
  name                = "scholardorm-production-insights"  # Match existing resource name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  application_type    = "web"
  tags                = local.common_tags
}

# Log Analytics Workspace
resource "azurerm_log_analytics_workspace" "main" {
  name                = "scholardorm-production-logs"  # Match existing resource name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                = "PerGB2018"
  retention_in_days   = 90  # Longer retention for production
  tags                = local.common_tags
}

# Action Group for alerts
resource "azurerm_monitor_action_group" "main" {
  name                = "scholardorm-production-alerts"  # Match existing resource name
  resource_group_name = azurerm_resource_group.main.name
  short_name          = "prod-alerts"

  email_receiver {
    name          = "admin"
    email_address = var.alert_email
  }

  tags = local.common_tags
}

# Alert for High Response Time (stricter for production)
resource "azurerm_monitor_metric_alert" "response_time" {
  name                = "scholardorm-production-high-response-time"  # Match existing resource name
  resource_group_name = azurerm_resource_group.main.name
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
  name                = "scholardorm-production-high-error-rate"  # Match existing resource name
  resource_group_name = azurerm_resource_group.main.name
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
  resource_group_name = azurerm_resource_group.main.name
  location           = azurerm_resource_group.main.location
  registry_name      = "${var.app_name}${local.environment}acr"  # Unique registry name
  environment        = local.environment
  tags               = local.common_tags
}

# Reference existing staging environment to avoid regional limit
data "azurerm_container_app_environment" "shared" {
  name                = "scholardorm-staging-env"
  resource_group_name = "rg-containerapp-staging"
}

# Frontend Container App
module "frontend_app" {
  source                     = "../../modules/container-app"
  resource_group_name        = azurerm_resource_group.main.name
  location                  = azurerm_resource_group.main.location
  app_name                  = "scholardorm"
  image_name                = var.image_name
  frontend_image            = "${module.container_registry.registry_url}/${var.image_name}-frontend:${var.image_tag}"
  backend_image             = null  # Frontend only
  frontend_only             = true
  shared_environment_id     = data.azurerm_container_app_environment.shared.id
  container_registry_url    = module.container_registry.registry_url
  registry_username         = module.container_registry.admin_username
  registry_password         = module.container_registry.admin_password
  environment               = "frontend-production"
  environment_variables     = {
    "NODE_ENV" = "production"
    "PORT" = "80"
    "REACT_APP_API_URL" = "https://scholardorm-production.gentlemeadow-49027184.eastus.azurecontainerapps.io/api"
  }
  cpu                       = "0.5"
  memory                    = "1.0Gi"
  min_replicas              = 0
  max_replicas              = 2
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  tags                      = local.common_tags
}

# Backend Container App  
module "backend_app" {
  source                     = "../../modules/container-app"
  resource_group_name        = azurerm_resource_group.main.name
  location                  = azurerm_resource_group.main.location
  app_name                  = var.app_name
  image_name                = var.image_name
  backend_image             = "${module.container_registry.registry_url}/${var.image_name}-backend:${var.image_tag}"
  frontend_image            = null  # Backend only
  frontend_only             = false
  shared_environment_id     = data.azurerm_container_app_environment.shared.id
  container_registry_url    = module.container_registry.registry_url
  registry_username         = module.container_registry.admin_username
  registry_password         = module.container_registry.admin_password
  environment               = local.environment
  environment_variables     = {
    "MONGO_URI" = "mongodb+srv://hijoyoffere:JoyOffere@cluster0.iwa32vm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    "NODE_ENV" = "production"
  }
  cpu                       = var.cpu
  memory                    = var.memory
  log_analytics_workspace_id = azurerm_log_analytics_workspace.main.id
  tags                      = local.common_tags
}