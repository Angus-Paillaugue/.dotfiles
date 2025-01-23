#!/bin/bash

docker build -t ownlogs/backend:staging -f $(dirname "$0")/../../backend/Dockerfile $(dirname "$0")/../../
docker build -t ownlogs/frontend:staging -f $(dirname "$0")/../../frontend/Dockerfile $(dirname "$0")/../../
docker build -t ownlogs/ai:staging -f $(dirname "$0")/../../ai/Dockerfile $(dirname "$0")/../../
