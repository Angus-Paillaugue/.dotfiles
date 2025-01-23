#!/bin/bash

bash "$(dirname "$0")/set-env.sh"

docker compose up
