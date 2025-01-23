#!/bin/bash

docker build -t ownlogs/backend:staging -f ../backend/Dockerfile ../
docker build -t ownlogs/frontend:staging -f ../frontend/Dockerfile ../
