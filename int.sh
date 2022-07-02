echo "Antes configurar la variable de entorno GITLAB_TOKEN:"
echo "export GITLAB_TOKEN=<SU_TOKEN_DE_GITLAB>"

terraform init \
    -backend-config="address=https://gl.deitech.online/api/v4/projects/411/terraform/state/grupo-01" \
    -backend-config="lock_address=https://gl.deitech.online/api/v4/projects/411/terraform/state/grupo-01/lock" \
    -backend-config="unlock_address=https://gl.deitech.online/api/v4/projects/411/terraform/state/grupo-01/lock" \
    -backend-config="username=angelestrada14" \
    -backend-config="password=$GITLAB_TOKEN" \
    -backend-config="lock_method=POST" \
    -backend-config="unlock_method=DELETE" \
    -backend-config="retry_wait_min=5"
