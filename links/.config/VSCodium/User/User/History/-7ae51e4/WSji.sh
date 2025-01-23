#!/bin/bash

# Function to add colored prefix
prefix_output() {
  local color=$1
  local prefix=$2
  awk -v color="$color" -v prefix="$prefix" '{print color prefix $0 "\033[0m"}'
}

# Start the frontend server with colored output
(cd frontend && unbuffer pnpm dev | prefix_output "\033[1;34m" "[FRONTEND] ") &

# Start the backend server with colored output
(cd backend && unbuffer pnpm dev | prefix_output "\033[1;32m" "[BACKEND] ") &

# Wait for both servers to exit
wait
