
resource "aws_eip" "NAT_EIP" {
vpc = true
tags = var.tags
}