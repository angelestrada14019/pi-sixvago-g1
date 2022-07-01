
resource "aws_instance" "practica1_ajea14019" {   
    ami=var.ami_id
    instance_type = var.instance_type
    tags=var.instance_tags
    key_name = var.key_name
    subnet_id=var.subnet_id
    security_groups = [var.security_groups]
    user_data = file(var.user_data)   
    associate_public_ip_address =var.associate_public_ip_address
    
}
