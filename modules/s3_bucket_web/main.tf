resource "aws_s3_bucket" "s3_bucket_web_ajea14019" {
  bucket = var.s3_bucket_web_name
  acl    = "public-read-write"
  policy = file("${path.module}/policy.json")

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  tags={
    web ="true"
  }
}
