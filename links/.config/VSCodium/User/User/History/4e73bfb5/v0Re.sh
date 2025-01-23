#!/bin/bash

PWD=$(pwd)

PWD../set-env.sh

./build-images.sh

docker compose -f ./docker-compose.test.yaml up
