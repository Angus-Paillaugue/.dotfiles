#!/bin/bash

cd ~/Documents/perso

# Create a new Svelte project
npm create svelte@latest $1
cd $1

# Install the dependencies
pnpm install
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

echo 
