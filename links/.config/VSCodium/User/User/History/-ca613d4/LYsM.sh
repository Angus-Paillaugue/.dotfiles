#!/bin/bash

bash "$(dirname "$0")/../set-env.sh"
docker run -v ./data/ollama:/root/.ollama -p 5000:11434 --name ownlogs_test_ai ollama/ollama
