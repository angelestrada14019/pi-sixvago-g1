#!/bin/sh
curl --netrc -X PATCH https://api.heroku.com/apps/back-pi-sixvago-g1-c2/formation \
  -d '{
  "updates": [
    {
      "type": "web",
      "docker_image": "${IMAGE_ID}"
    },
    {
      "type": "worker",
      "docker_image": "{$IMAGE_ID}"
    }
  ]
}' \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
  -H "Authorization: Bearer ${HEROKU_TOKEN}"
