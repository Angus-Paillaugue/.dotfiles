#!/bin/bash

ssh server << EOF
  cd /mnt/hdd/Skill-Forge
  git checkout main
  git pull
  mysql -u root -p < /mnt/hdd/Skill-Forge/scripts/db.sql
  pnpm install
  pnpm build-containers
  pnpm install
  pnpm build
  pm2 restart all
EOF
