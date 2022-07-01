echo "Antes configurar la variable de entorno GITLAB_TOKEN:"
echo "export GITLAB_TOKEN=<SU_TOKEN_DE_GITLAB>"

terraform init \
    -backend-config="address=https://gl.deitech.online/api/v4/projects/222/terraform/state/gitlab-terraform-aws" \
    -backend-config="lock_address=https://gl.deitech.online/api/v4/projects/222/terraform/state/gitlab-terraform-aws/lock" \
    -backend-config="unlock_address=https://gl.deitech.online/api/v4/projects/222/terraform/state/gitlab-terraform-aws/lock" \
    -backend-config="username=<username>" \
    -backend-config="password=$GITLAB_TOKEN" \
    -backend-config="lock_method=POST" \
    -backend-config="unlock_method=DELETE" \
    -backend-config="retry_wait_min=5"
