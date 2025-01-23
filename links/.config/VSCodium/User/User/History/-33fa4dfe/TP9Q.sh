#!/bin/bash

source ../install.sh

frontendEnvFilePath="$(dirname "$0")/../frontend/.env"
backendEnvFilePath="$(dirname "$0")/../backend/.env"
dockerEnvFilePath="$(dirname "$0")/.env"

# Frontend
{
  echo "PORT=$PUBLIC_FRONTEND_PORT"
  echo "ORIGIN=$PUBLIC_FRONTEND_ORIGIN:$PUBLIC_FRONTEND_PORT"
  echo "HOST=$PUBLIC_FRONTEND_HOST"
  echo "PUBLIC_BACKEND_HOST=$PUBLIC_BACKEND_HOST"
  echo "PUBLIC_BACKEND_PORT=$PUBLIC_BACKEND_PORT"
  echo "JWT_SECRET=$JWT_SECRET"
  echo "MYSQL_PASSWORD=$MYSQL_PASSWORD"
  echo "MYSQL_USER=$MYSQL_USER"
  echo "MYSQL_DATABASE=$MYSQL_DATABASE"
  echo "MYSQL_HOST=localhost"
  echo "PUBLIC_OLLAMA_URL=$PUBLIC_OLLAMA_URL"
} > $frontendEnvFilePath


# Docker
{
  echo "MYSQL_PASSWORD=$MYSQL_PASSWORD"
  echo "MYSQL_USER=$MYSQL_USER"
  echo "MYSQL_DATABASE=$MYSQL_DATABASE"
  echo "MYSQL_HOST=$MYSQL_HOST"
  echo "JWT_SECRET=$JWT_SECRET"
  echo "PUBLIC_OLLAMA_URL=$PUBLIC_OLLAMA_URL"
} > $dockerEnvFilePath


# Backend
{
  echo "PORT=$PUBLIC_BACKEND_PORT"
  echo "JWT_SECRET=$JWT_SECRET"
  echo "MYSQL_PASSWORD=$MYSQL_PASSWORD"
  echo "MYSQL_USER=$MYSQL_USER"
  echo "MYSQL_DATABASE=$MYSQL_DATABASE"
  echo "MYSQL_HOST=localhost"
} > $backendEnvFilePath

# Test
cp $dockerEnvFilePath "$(dirname "$0")/test/.env"
