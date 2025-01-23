#!/bin/bash

docker build -t ownlogs/ai:staging -f $(dirname "$0")/../../ai/Dockerfile $(dirname "$0")/../../

docker run -v ollama:/root/.ollama -p 5000:11434 --name ollama ollama/ollama
