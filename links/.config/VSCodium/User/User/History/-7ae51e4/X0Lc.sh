#!/bin/bash

# Function to start a process with a name and color
start_process() {
  local name=$1
  local color=$2
  shift 2
  "$@" | sed "s/^/[$name] /" | while IFS= read -r line; do
    echo -e "\033[${color}m$line\033[0m"
  done
}

# Start the frontend server with a name and color
start_process "frontend" "34" "cd frontend && pnpm dev" &

# Start the backend server with a name and color
start_process "backend" "32" "cd backend && pnpm dev" &

# Wait for both servers to exit
wait
