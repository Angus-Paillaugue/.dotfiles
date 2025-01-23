#!/bin/bash


GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Function to cleanup incomplete files
function handleCtrlC() {
  echo ""
  throwError "Caught <Ctrl>+C, exiting..." false
  exit 1
}

# Trap SIGINT (Ctrl+C) and call handleCtrlC function
trap handleCtrlC SIGINT
# Use trap to catch ERR and call the errorHandling function
trap 'errorHandling $LINENO $BASH_COMMAND' ERR SIGTERM

# Install the compressor script
sudo cp compressor.sh /usr/local/bin/compressor
sudo chmod +x /usr/local/bin/compressor

echo -e " ${GREEN}✓${NC} The compressor script has been installed successfully."
