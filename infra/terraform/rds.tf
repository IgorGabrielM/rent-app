resource "aws_db_subnet_group" "subnets" {
  name        = "pgsql-rent-app-prod"
  description = "Amazon RDS subnets"
  subnet_ids  = [for subnet in module.network.private_subnets : subnet.id]
}

resource "aws_db_parameter_group" "params" {
  name        = "pgsql-parameters-rent-app-prod"
  family      = "postgres15"
  description = "Postgresql parameter group"

  parameter {
    name  = "max_allowed_packet"
    value = "16777216"
  }

  parameter {
    name  = "character_set_server"
    value = "utf8"
  }

  parameter {
    name  = "character_set_client"
    value = "utf8"
  }
}

resource "aws_db_instance" "main" {
  allocated_storage       = 20
  engine                  = "postgres"
  engine_version          = "15.0.0"
  instance_class          = "db.t2.micro"
  storage_type            = "gp2"
  backup_retention_period = 30

  identifier = "rent_app"
  db_name    = "rent_app"
  username   = var.db_user
  password   = var.db_password

  db_subnet_group_name = aws_db_subnet_group.subnets.name
  parameter_group_name = aws_db_parameter_group.params.name

  multi_az               = false
  vpc_security_group_ids = [aws_security_group.pgsql.id]
  availability_zone      = data.aws_availability_zones.this.names[1]

  skip_final_snapshot = true

  tags = merge(local.default_tags, {
    "Name" = "rent-app-db-instance"
  })
}
