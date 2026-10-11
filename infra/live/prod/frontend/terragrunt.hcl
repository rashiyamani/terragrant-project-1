include "root" {
  path = find_in_parent_folders("root.hcl")
}

terraform {
  source = "../../../modules/static-site"
}

inputs = {
  bucket_name   = "my-react-app-prod-site-unique1234"
  force_destroy = false
  tags = {
    Environment = "prod"
    ManagedBy   = "OpenTofu-Terragrunt"
  }
}
