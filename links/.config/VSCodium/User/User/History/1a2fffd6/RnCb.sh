#!/bin/bash

# Usage:
# curl -s https://raw.githubusercontent.com/ownlogs/ownlogs/main/install.sh | bash

# Check if docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker first."
  exit 1
fi

# 
