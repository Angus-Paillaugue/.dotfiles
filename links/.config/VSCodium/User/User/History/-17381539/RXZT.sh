#!/bin/bash

docker build -t ownlogs/docs:staging .

docker compose up -d
