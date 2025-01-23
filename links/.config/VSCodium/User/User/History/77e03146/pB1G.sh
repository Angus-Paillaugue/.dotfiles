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

echo "PORT=$PUBLIC_FRONTEND_PORT" > $frontendEnvFilePath
