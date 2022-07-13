#!/bin/sh
set -x 

DATA='{ "updates": [ { "type": "web", "docker_image":"'
DATA="$DATA$IMAGE_ID"
DATA=$DATA'"}, { "type": "worker", "docker_image":"'
DATA=$DATA'" } ] }'

curl --netrc -X PATCH https://api.heroku.com/apps/back-pi-sixvago-g1-c2/formation \
  -d "$DATA" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
  -H "Authorization: Bearer ${HEROKU_TOKEN}"
