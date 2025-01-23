#!/bin/bash

# Tag images
docker tag ownlogs/docs:staging ownlogs/docs:latest

# Push to registry
docker push ownlogs/docs:latest
