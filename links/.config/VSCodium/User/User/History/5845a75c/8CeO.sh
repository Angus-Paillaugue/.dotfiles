#!/bin/bash


GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color


# Install the compressor script
sudo cp compressor.sh /usr/local/bin/compressor
echo -en " ${YELLOW}↺${NC} Installing the compressor script..."\\r
sudo chmod +x /usr/local/bin/compressor

echo -e " ${GREEN}✓${NC} The compressor script has been installed successfully."
