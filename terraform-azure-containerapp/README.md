# terraform-azure-containerapp

This project provisions both staging and production environments on Azure to deploy an application using Azure Container Apps through Azure Container Registry.

## Project Structure

```
terraform-azure-containerapp
├── environments
│   ├── staging
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── terraform.tfvars
│   └── production
│       ├── main.tf
│       ├── variables.tf
│       ├── outputs.tf
│       └── terraform.tfvars
├── modules
│   ├── container-registry
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── container-app
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── resource-group
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── shared
│   ├── provider.tf
│   └── backend.tf
├── .gitignore
├── terraform.tf
└── README.md
```

## Getting Started

### Prerequisites

- Terraform installed on your machine.
- An Azure account with the necessary permissions to create resources.

### Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd terraform-azure-containerapp
   ```

2. Configure your Azure credentials. You can do this by setting environment variables or using the Azure CLI.

3. Navigate to the desired environment (staging or production):
   ```
   cd environments/staging
   ```

4. Initialize Terraform:
   ```
   terraform init
   ```

5. Review the execution plan:
   ```
   terraform plan
   ```

6. Apply the configuration to provision the resources:
   ```
   terraform apply
   ```

### Modules

- **Container Registry**: Manages the Azure Container Registry.
- **Container App**: Deploys the Azure Container App.
- **Resource Group**: Creates a resource group to contain all resources.

### Outputs

After applying the configuration, you will receive outputs such as the URL of the deployed container app, which can be accessed to verify the deployment.

### Cleanup

To destroy the resources created by Terraform, run the following command in the respective environment directory:
```
terraform destroy
```

## License

This project is licensed under the MIT License.