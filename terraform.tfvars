#------------vpc..............................
region        = "us-east-1"

main_vpc_cidr = "10.0.0.0/24"
tags_vpc = {
  Name = "vpc-terraform_module-sixvago"
}
#---------internet Gatway.........................
tags_ig = {
  Name = "ig-terraform_module-sixvago"
}
#--------subnet zone a-----------------------------
subnets_cidr_zone_a = "10.0.0.0/28"
subnets_availability_zone_a = "us-east-1a"
subnets_tags_zone_a = {
    Name = "subnet-public-terraform_module-sixvago_zone_a"
}
#--------subnet zone b-----------------------------
subnets_cidr_zone_b = "10.0.0.20/28"
subnets_availability_zone_b = "us-east-1b"
subnets_tags_zone_b = {
    Name = "subnet-public-terraform_module-sixvago_zone_b"
}
#--------route table public----------------------

cidr_block_route_table_public = "0.0.0.0/0"
tags_route_table_public ={
  Name = "route-table-public-terraform_module-sixvago"
}
#---------security group zone a-------------------------
name_sg_zone_a = "secu_group_prueba_sixvago_zone_a"
ingres_rules_zone_a = [
  {
    from_port = "22",
    to_port   = "22",
    protocol  = "tcp",
    cidr_blocks : ["0.0.0.0/0"]
  },
  {
    from_port = "8080",
    to_port   = "8080",
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
#---------security group zone b-------------------------
name_sg_zone_b = "secu_group_prueba_sixvago_zone_b"
ingres_rules_zone_b = [
  {
    from_port = "22",
    to_port   = "22",
    protocol  = "tcp",
    cidr_blocks : ["0.0.0.0/0"]
  },
  {
    from_port = "8080",
    to_port   = "8080",
    protocol  = "tcp",
    cidr_blocks : ["0.0.0.0/0"]
  }
]
egress_rules_zone_b = [
  {
    from_port = 0,
    to_port   = 0,
    protocol  = "-1",
    cidr_blocks : ["0.0.0.0/0"]
    }
]
#-----instance ec2
ami_id        = "ami-0e472ba40eb589f49"
instance_type = "t2.micro"
key_name  = "G1-sixvago-Kp"
#-----------instancia ec2 zone a-------------------------
instance_tags_zone_a =  {
    Name        = "terraform_gitlab_sixvago_zone_a"
    Environment = "dev"
}
user_data_zone_a = "scrip.sh"
#-----------instancia ec2 zone a-------------------------
instance_tags_zone_b =  {
    Name        = "terraform_gitlab_sixvago_zone_b"
    Environment = "dev"
}
user_data_zone_b = "scrip.sh"

#--------------db subnet group
name_db_group_subnet=  "db_subnet_group-sixvago"
tags_db_group_subnet=  {
    Name = "db_subnet_group-sixvago"
}
#-------------rds instance-----------------------
allocated_storage= 10
storage_type= "gp2"
engine= "mysql"
engine_version= "8.0.19"
instance_class= "db.t3.micro"
name_db= "practica1_bd_RDS_sixvago"
username=  "admin"
password= "sixvagog1"
availability_zone=  "us-east-1a"
parameter_group_name= "default.mysql8.0"
#-----------s3 bucket web-----------------------------
s3_bucket_web_name="s3-bucket-web-sixvago"
#-----------s3 bucket public -------------------------
s3_bucket_name="s3-bucket-public-sixvago"
#----------ecr-------------------------------------
ecr_name="ecr-sixvago"
