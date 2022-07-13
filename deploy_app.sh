curl --netrc -X PATCH https://api.heroku.com/apps/back-pi-sixvago-g1-c2/formation \
  -d '{
  "updates": [
    {
      "type": "web",
      "docker_image": "registry.heroku.com/back-pi-sixvago-g1-c2:latest"
    },
    {
      "type": "worker",
      "docker_image": "registry.heroku.com/back-pi-sixvago-g1-c2:latest"
    }
  ]
}' \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases"
