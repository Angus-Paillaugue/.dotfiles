#!/bin/bash

cd ~/Documents/perso

# Create a new Svelte project
npm create svelte@latest $1
cd $1

# Install the dependencies
pnpm install
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

cat <<EOT >> btop.desktop
[Desktop Entry]
Type=Application
Version=1.0
Name=Btop
GenericName=System Monitor
Comment=Resource monitor that shows usage and stats for processor, memory, disks, network and processes
Icon=btop
Exec=btop
Terminal=true
Categories=System;Monitor;ConsoleOnly;
Keywords=system;process;task
EOT
