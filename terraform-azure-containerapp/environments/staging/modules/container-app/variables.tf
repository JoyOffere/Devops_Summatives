variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "image_name" {
  description = "Container image name"
  type        = string
}

variable "container_registry_url" {
  description = "URL of the container registry"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "cpu" {
  description = "CPU allocation for the container"
  type        = string
  default     = "0.25"
}

variable "memory" {
  description = "Memory allocation for the container"
  type        = string
  default     = "0.5Gi"
}

variable "environment_variables" {
  description = "Environment variables for the container app"
  type        = map(string)
  default     = {}
}

variable "log_analytics_workspace_id" {
  description = "Log Analytics workspace ID"
  type        = string
  default     = ""
}

variable "app_insights_connection_string" {
  description = "Application Insights connection string"
  type        = string
  default     = ""
}