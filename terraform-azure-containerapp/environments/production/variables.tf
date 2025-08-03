variable "app_name" {
  description = "Name of the application"
  type        = string
}

variable "container_registry_name" {
  description = "The name of the Azure Container Registry."
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group for the production environment."
  type        = string
}

variable "location" {
  description = "The Azure region where resources will be deployed."
  type        = string
}

variable "environment" {
  description = "The environment type (e.g., production)."
  type        = string
  default     = "production"
}

variable "image_tag" {
  description = "The tag of the container image to deploy."
  type        = string
}

variable "image_name" {
  description = "Container image name"
  type        = string
}

variable "environment_variables" {
  description = "Environment variables for the container"
  type        = map(string)
  default     = {}
}

variable "cpu" {
  description = "CPU allocation for container"
  type        = string
  default     = "0.5"
}

variable "memory" {
  description = "Memory allocation for container"
  type        = string
  default     = "1.0Gi"
}

variable "alert_email" {
  description = "Email address for alerts"
  type        = string
}

variable "use_existing_resource_group" {
  description = "Whether to use an existing resource group or create a new one"
  type        = bool
  default     = true  # Default to using existing to avoid conflicts
}