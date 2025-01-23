#!/bin/bash

# Backend

docker build -t ownlogs/backend -f ../backend/Dockerfile ../
docker build -t ownlogs/frontend -f ../frontend/Dockerfile ../
