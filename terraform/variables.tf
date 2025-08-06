# Azure Infrastructure Variables
variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "scholardorm"
}

variable "environment" {
  description = "Environment (staging, production)"
  type        = string
  default     = "staging"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "West US 2"
}

variable "mongo_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
}

variable "use_existing_environment" {
  description = "Whether to use an existing Container App Environment"
  type        = bool
  default     = false
}

variable "existing_environment_name" {
  description = "Name of existing Container App Environment to use"
  type        = string
  default     = ""
}

variable "existing_environment_rg" {
  description = "Resource group of existing Container App Environment"
  type        = string
  default     = ""
}
