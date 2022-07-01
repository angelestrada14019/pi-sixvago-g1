
resource "aws_nat_gateway" "NAT_GW" {
allocation_id = var.nat_gateway_id
subnet_id = var.subnet_id
tags = var.tags
}