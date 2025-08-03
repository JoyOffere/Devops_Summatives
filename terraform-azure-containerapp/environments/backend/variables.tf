variable "location" {
  description = "Azure region"
  type        = string
  default     = "East US"
}

variable "backend_image" {
  description = "Backend container image with tag"
  type        = string
}

variable "registry_server" {
  description = "Container registry server"
  type        = string
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
