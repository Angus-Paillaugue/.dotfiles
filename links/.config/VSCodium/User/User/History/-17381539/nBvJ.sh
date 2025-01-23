#!/bin/bash

bash "$(dirname "$0")/build.sh"

docker compose up -d
