#!/bin/bash

cd ~/Downloads
wget "https://discord.com/api/download?platform=linux&format=deb" -O discord-upgrade.deb
sudo dpkg -i discord-upgrade.deb exit

rm discord-upgrade.deb
