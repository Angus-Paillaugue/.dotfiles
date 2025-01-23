#!/bin/bash


GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color


# Install the compressor script
echo -e " ${GREEN}✓${NC} Renamed ${#files[@]} files successfully"
sudo cp compressor.sh /usr/local/bin/compressor
sudo chmod +x /usr/local/bin/compressor
