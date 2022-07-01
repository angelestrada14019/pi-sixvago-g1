
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
module "subnet_module_zone_a"{ //0 para subnet publico y 1 para subnet privado
    source = "./modules/subnet"
    vpc_id=module.vpc_module.id
    cidr_block=var.subnets_cidr_zone_a
    tags=var.subnets_tags_zone_a 
    availability_zone=var.subnets_availability_zone_a

}
module "route_table_module_public" {
    source = "./modules/route_table"
    vpc_id=module.vpc_module.id
    cidr_block=var.cidr_block_route_table_public
    gateway_id=module.ig_module.id
    nat_gateway_id=null    
    tags=var.tags_route_table_public
}

module "public_rt_association" {
    source = "./modules/rot_table_asso_subnet"
    subnet_id=module.subnet_module_zone_a.id  
    route_table_id=module.route_table_module_public.id
}

module "sg_module" {
    source = "./modules/security_groups"
    count=length(var.name_sg)
    sg_name=var.name_sg[count.index]
    ingres_rules=var.ingres_rules[count.index]
    egress_rules=var.egress_rules[count.index]
    vpc_id=module.vpc_module.id
}




locals {
  virtual_machines = [
      #si se coloca la variable associate_public_address en true, no es necesario luego asociar o crear una ip elastica
    {
        id=0
            subnet_id=module.subnet_module_zone_a.id
            instance_tags=var.instance_tags[0]
            security_groups=module.sg_module[0].id
            user_data=var.user_data[0]
            associate_public_ip_address=true

        }
  ]
}    

module "instance_module" {
    source = "./modules/instance"
  for_each   = {
    for  vm in local.virtual_machines:
    vm.id => vm }   

    subnet_id=each.value.subnet_id
    instance_tags=each.value.instance_tags
    security_groups=each.value.security_groups
    user_data=each.value.user_data
    associate_public_ip_address=each.value.associate_public_ip_address
    ami_id=var.ami_id    
    instance_type=var.instance_type
    key_name=var.key_name

}



