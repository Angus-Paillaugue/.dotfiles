#!/bin/bash

docker run -d -v ollama:/root/.ollama -p 5000:11434 --name ollama ollama/ollama
