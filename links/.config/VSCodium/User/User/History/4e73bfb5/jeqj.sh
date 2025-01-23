#!/bin/bash

bash "$(dirname "$0")/../set-env.sh"
bash "$(dirname "$0")/build-images.sh"

docker compose -f ./docker-compose.test.yaml up
