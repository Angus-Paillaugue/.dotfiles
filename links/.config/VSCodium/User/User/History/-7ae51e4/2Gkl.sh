#!/bin/bash

# Start the frontend server
(cd frontend && pnpm dev) &

# Start the backend server
(cd backend && pnpm dev) &

# Wait for both servers to exit
wait
