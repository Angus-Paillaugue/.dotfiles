#!/bin/bash

ssh server
cd /mnt/hdd/Skill-Forge
git checkout main
git pull
pnpm install
pnpm build

# Restart the server
pm2 restart 5
