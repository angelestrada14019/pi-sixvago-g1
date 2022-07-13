#!/bin/sh
set -x 

DATA='{ "updates": [ { "type": "web", "docker_image":"'
DATA="$DATA$IMAGE_ID"
DATA=$DATA'" } ] }'

curl -X PATCH https://api.heroku.com/apps/back-pi-sixvago-g1-c2/formation --header "Content-Type: application/json" --header "Accept: application/vnd.heroku+json; version=3.docker-releases" --header "Authorization: Bearer ${HEROKU_TOKEN}" --data "$DATA" --fail
