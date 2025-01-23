#!/bin/bash

docker build -t ownlogs/backend:latest -f $(dirname "$0")/../../backend/Dockerfile $(dirname "$0")/../../backend
docker build -t ownlogs/frontend:latest -f $(dirname "$0")/../../frontend/Dockerfile $(dirname "$0")/../../frontend
