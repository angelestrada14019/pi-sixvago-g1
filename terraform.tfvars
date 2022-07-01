region        = "us-east-1"

main_vpc_cidr = "10.0.0.0/24"
tags_vpc = {
  Name = "vpc-terraform_module-sixvago"
}
tags_ig = {
  Name = "ig-terraform_module-sixvago"
}

subnets_cidr_zone_a = "10.0.0.128/26"


subnets_availability_zone_a = "us-east-1a"
subnets_tags_zone_a = {
    Name = "subnet-public-terraform_module-sixvago"
  }

cidr_block_route_table_public = "0.0.0.0/0"
tags_route_table_public ={
  Name = "route-table-public-terraform_module-sixvago"
}
ami_id        = "ami-0e472ba40eb589f49"
instance_type = "t2.micro"
instance_tags_zone_a =  {
    Name        = "terraform_gitlab_sixvago"
    Environment = "dev"
  }

name_sg_zone_a = "secu_group_prueba_sixvago"
ingres_rules_zone_a = [
  {
    from_port = "22",
    to_port   = "22",
    protocol  = "tcp",
    cidr_blocks : ["0.0.0.0/0"]
  },
  {
    from_port = "3000",
    to_port   = "3000",
    protocol  = "tcp",
    cidr_blocks : ["0.0.0.0/0"]
  },
  {
    from_port = "8081",
    to_port   = "8081",
    protocol  = "tcp",
    cidr_blocks : ["0.0.0.0/0"]
  }
]
egress_rules_zone_a = [
  {
    from_port = 0,
    to_port   = 0,
    protocol  = "-1",
    cidr_blocks : ["0.0.0.0/0"]
    }
  ]

key_name  = "G1-sixvago-Kp"
user_data_zone_a = "scrip.sh"
