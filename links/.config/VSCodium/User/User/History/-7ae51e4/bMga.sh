#!/bin/bash

# Start the frontend server
(cd frontend && npm start) &

# Start the backend server
(cd backend && npm start) &

# Wait for both servers to exit
wait
