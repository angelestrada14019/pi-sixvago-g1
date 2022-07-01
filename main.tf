
module "vpc_module" {
  source = "./modules/vpc"
    cidr_block=var.main_vpc_cidr
    tags=var.tags_vpc
}
module "ig_module" {
  source = "./modules/internet_gatway"
    vpc_id=module.vpc_module.id
    tags=var.tags_ig
}
module "subnet_module_zone_a"{ 
    source = "./modules/subnet"
    vpc_id=module.vpc_module.id
    cidr_block=var.subnets_cidr_zone_a
    tags=var.subnets_tags_zone_a 
    availability_zone=var.subnets_availability_zone_a

}
module "subnet_module_zone_b"{ 
    source = "./modules/subnet"
    vpc_id=module.vpc_module.id
    cidr_block=var.subnets_cidr_zone_b
    tags=var.subnets_tags_zone_b
    availability_zone=var.subnets_availability_zone_b

}
module "route_table_module_public" {
    source = "./modules/route_table"
    vpc_id=module.vpc_module.id
    cidr_block=var.cidr_block_route_table_public
    gateway_id=module.ig_module.id
    nat_gateway_id=null    
    tags=var.tags_route_table_public
}

module "public_rt_association_zone_a" {
    source = "./modules/rot_table_asso_subnet"
    subnet_id=module.subnet_module_zone_a.id  
    route_table_id=module.route_table_module_public.id
}
module "public_rt_association_zone_b" {
    source = "./modules/rot_table_asso_subnet"
    subnet_id=module.subnet_module_zone_b.id  
    route_table_id=module.route_table_module_public.id
}

module "sg_module_zone_a" {
    source = "./modules/security_groups"
    sg_name=var.name_sg_zone_a
    ingres_rules=var.ingres_rules_zone_a
    egress_rules=var.egress_rules_zone_a
    vpc_id=module.vpc_module.id
} 
module "sg_module_zone_b" {
    source = "./modules/security_groups"
    sg_name=var.name_sg_zone_b
    ingres_rules=var.ingres_rules_zone_b
    egress_rules=var.egress_rules_zone_b
    vpc_id=module.vpc_module.id
}  

module "instance_module_zone_a" {
    source = "./modules/instance"
    subnet_id=module.subnet_module_zone_a.id
    instance_tags=var.instance_tags_zone_a
    security_groups=module.sg_module_zone_a.id
    user_data=var.user_data_zone_a
    associate_public_ip_address=true
    ami_id=var.ami_id    
    instance_type=var.instance_type
    key_name=var.key_name

}
module "instance_module_zone_b" {
    source = "./modules/instance"
    subnet_id=module.subnet_module_zone_b.id
    instance_tags=var.instance_tags_zone_b
    security_groups=module.sg_module_zone_b.id
    user_data=var.user_data_zone_b
    associate_public_ip_address=true
    ami_id=var.ami_id    
    instance_type=var.instance_type
    key_name=var.key_name

}

module "db_subnet_group" {
    source = "./modules/db_rds_group_subnet"
    name_db_group_subnet=var.name_db_group_subnet
    subnet_ids=[module.subnet_module_zone_a.id,module.subnet_module_zone_b.id]
    tags_db_group_subnet=var.tags_db_group_subnet
}

module "rds_instance" {
    source="./modules/rds_instance"
    allocated_storage=var.allocated_storage
    storage_type=var.storage_type
    engine = var.engine
    engine_version= var.engine_version
    instance_class= var.instance_class
    name_db=var.name_db
    username = var.username
    password = var.password
    availability_zone=var.availability_zone
    parameter_group_name = var.parameter_group_name  
    db_subnet_group_name = module.db_subnet_group.name
}

module "static_web" {
    source = "./modules/s3_bucket_web"
    s3_bucket_web_name=var.s3_bucket_web_name    
}
module "public_bucket" {
    source = "./modules/s3_bucket_public"
    s3_bucket_name=var.s3_bucket_name    
}

module "ecr_repo" {
    source = "./modules/ecr"
    ecr_name=var.ecr_name    
}


