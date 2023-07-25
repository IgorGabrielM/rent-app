module "network" {
  source = "terraform-aws-modules/vpc/aws"

  name = "vpc-rent-app-prod"
  cidr = "10.0.0.0/16"

  azs             = data.aws_availability_zones.this.names
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]

  enable_nat_gateway = false
  enable_vpn_gateway = false

  tags = local.default_tags
}
