resource "aws_security_group" "pgsql" {
  vpc_id      = module.network.vpc_id
  name        = "pgsql-rent-app-sg-prod"
  description = "Allow Postgres connection"

  ingress {
    from_port   = 5432
    protocol    = "tcp"
    to_port     = 5432
    #    security_groups = [aws_security_group.beanstalk.id]
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    protocol    = "-1"
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.default_tags, {
    "Name" = "pgsql-rent-app-sg-prod"
  })
}
