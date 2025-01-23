#!/bin/bash

# Load environment variables
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)

dotEnvFileContents=$(cat .env)
dbPassword=$DB_PASSWORD

ssh server << EOF
  cd /mnt/hdd/Skill-Forge
  git checkout main
  git pull
  echo "$dotEnvFileContents" > .env
  mysql -u skillforge -p$dbPassword skillforge < migrate.sql
  pnpm install
  pnpm build-containers
  pnpm install
  pnpm build
  pm2 restart all
EOF
