output "id" {
  value = aws_eip.NAT_EIP.id
}
output "ip" {
  value = aws_eip.NAT_EIP.public_ip
}