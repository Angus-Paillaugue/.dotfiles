#!/bin/bash

# Start the frontend server
(cd frontend && pnpm dev) &

# Start the backend server
(cd backend && npm start) &

# Wait for both servers to exit
wait
