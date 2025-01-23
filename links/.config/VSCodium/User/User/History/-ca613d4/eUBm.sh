#!/bin/bash

docker run -v ./ollama:/root/.ollama -p 5000:11434 --name ownlogs_test_ai ollama/ollama
