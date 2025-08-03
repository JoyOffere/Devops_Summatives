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

variable "frontend_image" {
  description = "Frontend container image with tag"
  type        = string
  default     = null
}

variable "backend_image" {
  description = "Backend container image with tag"
  type        = string
  default     = null
}

variable "container_registry_url" {
  description = "URL of the container registry"
  type        = string
}

variable "environment" {
  description = "Environment name"
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
  default     = "0.25"
}

variable "memory" {
  description = "Memory allocation for container"
  type        = string
  default     = "0.5Gi"
}

variable "log_analytics_workspace_id" {
  description = "Log Analytics workspace ID"
  type        = string
  default     = ""
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

variable "min_replicas" {
  description = "Minimum number of replicas"
  type        = number
  default     = 0  # Scale to zero for cost savings
}

variable "max_replicas" {
  description = "Maximum number of replicas"
  type        = number
  default     = 2  # Limit scaling for cost control
}

variable "shared_environment_id" {
  description = "ID of an existing Container App Environment to use instead of creating a new one"
  type        = string
  default     = null
}

variable "registry_username" {
  description = "Container registry username"
  type        = string
}

variable "registry_password" {
  description = "Container registry password"
  type        = string
  sensitive   = true
}

variable "frontend_only" {
  description = "Deploy only frontend container (for microservices architecture)"
  type        = bool
  default     = false
}

variable "target_port" {
  description = "Target port for ingress"
  type        = number
  default     = 80
}

variable "use_existing_container_app" {
  description = "Whether to use an existing container app instead of creating a new one"
  type        = bool
  default     = false
}

variable "use_existing_container_environment" {
  description = "Whether to use an existing container app environment instead of creating a new one"
  type        = bool
  default     = false
}

variable "existing_container_environment_name" {
  description = "Name of existing container app environment (required if use_existing_container_environment is true)"
  type        = string
  default     = null
}