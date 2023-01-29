resource "aws_s3_bucket" "uploads" {
  bucket = "omni-rent-app-uploads"
  tags   = local.default_tags
}
