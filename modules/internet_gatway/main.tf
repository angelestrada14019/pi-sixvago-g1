
resource "aws_internet_gateway" "ig_ajea14019" {
    vpc_id = var.vpc_id
    tags = var.tags
}