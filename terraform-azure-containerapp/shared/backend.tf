terraform {
  backend "azurerm" {
    resource_group_name  = "your-resource-group-name"
    storage_account_name = "yourstorageaccountname"
    container_name       = "your-container-name"
    key                  = "terraform.tfstate"
  }
}