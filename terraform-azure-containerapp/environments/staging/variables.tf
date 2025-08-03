variable "resource_group_name" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region"
  type        = string
}

variable "registry_name" {
  description = "Name of the container registry"
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

variable "alert_email" {
  description = "Email address for alerts"
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

variable "frontend_only" {
  description = "Deploy only frontend container (microservices mode)"
  type        = bool
  default     = false
}
