variable "aws_region" {
  type        = string
  description = "Region for AWS resources"
  default     = "us-east-1"
}

variable "db_user" {
  type        = string
  description = "User for connecting to database"
  default     = ""
}

variable "db_password" {
  type        = string
  description = "Password for connecting to database"
  default     = ""
}
