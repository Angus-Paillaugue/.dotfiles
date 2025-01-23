#!/bin/bash

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

frontendEnvFilePath='./frontend/.env'
backendEnvFilePath='./backend/.env'
dockerEnvFilePath='./.env'

PUBLIC_FRONTEND_PORT='4173'
PUBLIC_FRONTEND_ORIGIN='http://localhost'
PUBLIC_FRONTEND_HOST='0.0.0.0'
PUBLIC_BACKEND_PORT='3000'
MYSQL_USER='ownlogs'
MYSQL_DATABASE='ownlogs'

  JWT_SECRET=$(getDotEnvValue $dockerEnvFilePath 'JWT_SECRET')
  JWT_SECRET=$(getDotEnvValue $dockerEnvFilePath 'JWT_SECRET')
fi
JWT_SECRET=$(getDotEnvValue $dockerEnvFilePath 'JWT_SECRET')
fi

# Generate MYSQL_PASSWORD secret
if [ -z $(getDotEnvValue $dockerEnvFilePath 'MYSQL_PASSWORD') ]; then
  echo "Generating MYSQL_PASSWORD secret"
  MYSQL_PASSWORD=$(generateRandomString)
else
  echo "Found existing MYSQL_PASSWORD secret, using that one"
  MYSQL_PASSWORD=$(getDotEnvValue $dockerEnvFilePath 'MYSQL_PASSWORD')
fi


# DO NOT CHANGE HOSTS
PUBLIC_BACKEND_HOST='localhost'
MYSQL_HOST='db'


# Frontend
echo "" > $frontendEnvFilePath
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
} >> $frontendEnvFilePath


# Docker
echo "" > $dockerEnvFilePath
{
  echo "MYSQL_PASSWORD=$MYSQL_PASSWORD"
  echo "MYSQL_USER=$MYSQL_USER"
  echo "MYSQL_DATABASE=$MYSQL_DATABASE"
  echo "MYSQL_HOST=$MYSQL_HOST"
  echo "JWT_SECRET=$JWT_SECRET"
} >> $dockerEnvFilePath


# Backend
echo "" > $backendEnvFilePath
{
  echo "PORT=$PUBLIC_BACKEND_PORT"
  echo "JWT_SECRET=$JWT_SECRET"
  echo "MYSQL_PASSWORD=$MYSQL_PASSWORD"
  echo "MYSQL_USER=$MYSQL_USER"
  echo "MYSQL_DATABASE=$MYSQL_DATABASE"
  echo "MYSQL_HOST=localhost"
} >> $backendEnvFilePath
