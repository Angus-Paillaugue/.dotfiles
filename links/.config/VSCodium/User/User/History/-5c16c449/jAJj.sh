#!/bin/bash

# Load environment variables
[ ! -f .env ] || export $(grep -v '^#' .env | xargs)

dbPassword=$DB_PASSWORD
ssh server << EOF
  cd /mnt/hdd/Skill-Forge
  git checkout main
  git pull
  mysql -u root -p < ./migrate.sql
  pnpm install
  pnpm build-containers
  pnpm install
  pnpm build
  pm2 restart all
EOF
