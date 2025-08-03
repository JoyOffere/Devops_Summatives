provider "azurerm" {
  features {}

  # Optional: Specify the version of the provider
  version = "=2.80.0"  # Adjust the version as needed
}

# Optional: Configure authentication
# You can use environment variables or a service principal for authentication
# Example:
# client_id       = var.client_id
# client_secret   = var.client_secret
# tenant_id       = var.tenant_id
# subscription_id  = var.subscription_id