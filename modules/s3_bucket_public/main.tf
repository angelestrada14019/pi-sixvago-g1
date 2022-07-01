resource "aws_s3_bucket" "s3_bucket_public_ajea14019" {
  bucket = var.s3_bucket_name
  acl    = "public-read-write"
  policy = file("${path.module}/policy.json")
  tags={
    web ="true"
  }
}