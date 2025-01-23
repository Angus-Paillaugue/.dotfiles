#!/bin/bash

# Build the Docker image
docker build -t music-player:latest $(dirname "$0")/../
