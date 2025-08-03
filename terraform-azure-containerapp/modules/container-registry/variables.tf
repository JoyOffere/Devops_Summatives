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

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "sku" {
  description = "SKU for the container registry"
  type        = string
  default     = "Basic"  # Cheapest option
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

variable "use_existing_registry" {
  description = "Whether to use an existing container registry instead of creating a new one"
  type        = bool
  default     = false
}