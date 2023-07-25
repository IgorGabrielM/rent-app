terraform {
  backend "s3" {
    bucket  = "omni-infra-state"
    key     = "rent-app/production.tfstate"
    profile = "default"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "default"
}
