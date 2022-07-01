resource "aws_db_subnet_group" "db_subnet_group" {
  name       = var.name_db_group_subnet
  subnet_ids = var.subnet_ids
  tags = var.tags_db_group_subnet
}