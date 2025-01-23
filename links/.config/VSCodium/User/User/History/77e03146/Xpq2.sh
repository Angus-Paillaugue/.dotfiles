#!/bin/bash

PUBLIC_FRONTEND_PORT='4173'
PUBLIC_BACKEND_PORT='3000'
PUBLIC_BACKEND_HOST='localhost'
JWT_SECRET='0drRIJY2BWOHhRnDHsTzIA2G9vsjMMQh52AEOEAMWAG2xt1wWA'
MYSQL_PASSWORD='logify'
MYSQL_USER='logify'
MYSQL_DATABASE='logify'
# DO NOT CHANGE HOST
MYSQL_HOST='db'

frontendEnvFilePath='./frontend/.env'
backendEnvFilePath='./backend/.env'
dockerEnvFilePath='./.env'

# Frontend
echo "PORT=$PUBLIC_FRONTEND_PORT" > $frontendEnvFilePath
echo "JWT_SECRET=$JWT_SECRET" > $frontendEnvFilePath
echo "MYSQL_PASSWORD=$MYSQL_PASSWORD" > $frontendEnvFilePath
echo "MYSQL_USER=$MYSQL_USER" > $frontendEnvFilePath
echo "MYSQL_DATABASE=$MYSQL_DATABASE" > $frontendEnvFilePath
echo "MYSQL_HOST=$MYSQL_HOST" > $frontendEnvFilePath
echo "PUBLIC_BACKEND_HOST=$PUBLIC_BACKEND_HOST" > $frontendEnvFilePath
echo "PUBLIC_BACKEND_PORT=$PUBLIC_BACKEND_PORT" > $frontendEnvFilePath

# Backend
echo "PORT=$PUBLIC_BACKEND_PORT" > $backendEnvFilePath
