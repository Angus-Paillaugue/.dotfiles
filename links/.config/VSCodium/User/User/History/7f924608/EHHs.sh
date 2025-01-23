#!/bin/bash

bash "$(dirname "$0")/set-env.sh"

# Tag images
docker tag ownlogs/backend:staging ownlogs/backend:latest
docker tag ownlogs/frontend:staging ownlogs/frontend:latest

# Push to registry
docker push ownlogs/backend:latest
docker push ownlogs/frontend:latest
