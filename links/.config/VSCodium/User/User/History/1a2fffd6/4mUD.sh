#!/bin/bash


# Usage:
# curl -s https://raw.githubusercontent.com/ownlogs/ownlogs/main/install.sh | bash


function generateRandomString() {
  echo $(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 64 | head -n 1)
}

function getDotEnvValue() {

  # Check if file exists
  if [ ! -f $1 ]; then
    echo $(generateRandomString)
  fi
  echo $(grep $2 $1 | cut -d '=' -f2)
}

# Check if docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker first."
  exit 1
fi


# START - ENV setting

envFilePath="$(dirname "$0")/.env"

PUBLIC_FRONTEND_PORT='4173'
PUBLIC_FRONTEND_ORIGIN='http://localhost'
PUBLIC_FRONTEND_HOST='0.0.0.0'
PUBLIC_BACKEND_PORT='3000'
PUBLIC_OLLAMA_URL="http://localhost:11434"
MYSQL_USER='ownlogs'
MYSQL_DATABASE='ownlogs'
MYSQL_PASSWORD='ownlogs'
JWT_SECRET=$(getDotEnvValue $envFilePath 'JWT_SECRET')
PUBLIC_BACKEND_HOST='localhost'
MYSQL_HOST='db'
# Writing
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
} > $envFilePath

# END - ENV setting


# Getting the docker compose file
curl -s https://raw.githubusercontent.com/ownlogs/ownlogs/main/docker/docker-compose.yaml -o docker-compose.yaml

# Start the docker containers
docker compose up -d
