#!/bin/bash



docker build -t ownlogs/backend -f $(dirname "$0")../backend/Dockerfile $(dirname "$0")../
docker build -t ownlogs/frontend -f $(dirname "$0")../frontend/Dockerfile $(dirname "$0")../
