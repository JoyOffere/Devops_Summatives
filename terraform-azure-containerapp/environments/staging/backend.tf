terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "scholardormtfstate"
    container_name       = "tfstate"
    key                  = "staging/terraform.tfstate"
  }
}
