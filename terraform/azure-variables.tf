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
  default     = "East US"
}

variable "mongo_uri" {
  description = "MongoDB connection string"
  type        = string
  sensitive   = true
}

# Legacy AWS variables (kept for compatibility)
variable "region" {
  description = "AWS region (legacy - not used in Azure deployment)"
  type        = string
  default     = "us-east-1"
}
