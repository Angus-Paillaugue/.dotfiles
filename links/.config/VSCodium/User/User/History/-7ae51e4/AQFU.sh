#!/bin/bash

# Function to add colored prefix
prefix_output() {
  local color="$1"
  local prefix="$2"
  while IFS= read -r line; do
    echo -e "${color}${prefix}\033[0m ${line}"
  done
}

# Start the frontend server with colored output
(
  cd frontend
  pnpm dev 2>&1 | prefix_output "\033[1;34m" "[FRONTEND]"
) &

# Start the backend server with colored output
(
  cd backend
  pnpm dev 2>&1 | prefix_output "\033[1;32m" "[BACKEND]"
) &

# Wait for both servers to exit
wait
