#!/bin/bash

1fffe66129d7f32805d54e828796e9d045ffe3548d982aa13c5acc66ef680eba
docker run -v ollama:/root/.ollama -p 5000:11434 --name ollama ollama/ollama
