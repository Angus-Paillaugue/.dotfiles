#!/bin/bash

bash "$(dirname "$0")/set-env.sh"

bash "$(dirname "$0")/build.sh"

docker compose up
