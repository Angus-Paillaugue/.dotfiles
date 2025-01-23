#!/bin/bash

./set-env.sh

docker compose -f ./docker-compose.test.yaml up --build
