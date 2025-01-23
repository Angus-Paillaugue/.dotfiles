#!/bin/bash

# Build the Docker image
docker build -t music-player .
# Tag the Docker image
docker tag music-player:latest
