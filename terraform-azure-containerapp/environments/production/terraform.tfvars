app_name    = "scholardorm"
location    = "East US"
image_name  = "scholardorm"
resource_group_name = "scholardorm-production-rg"
container_registry_name = "scholardormproductionacr"
image_tag = "latest"
environment_variables = {
  ENV = "production"
  NODE_ENV = "production"
  MONGO_URI = "mongodb+srv://hijoyoffere:JoyOffere@cluster0.iwa32vm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
}
cpu         = "1.0"
memory      = "2.0Gi"
alert_email = "j.offere@alustudent.com"