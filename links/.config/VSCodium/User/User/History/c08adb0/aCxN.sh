#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color
currentOutputFile=""

# Check if ffmpeg is installed
if [ ! -x "$(command -v ffmpeg)" ]; then
  throwError "ffmpeg is not installed. Please install ffmpeg to continue."
  exit 1
fi

# Function to handle errors
function errorHandling() {
  # $1: line number
  # $2: error message
  echo -e "${RED}Error on line $1: $2${NC}"
  exit 1
}

# Function to throw error and exit
function throwError() {
  # $1: error message
  echo -e " ${RED}✖${NC} $1"
  local exitCode=${2:true}
  if [ "$exitCode" = true ]; then
    exit 1
  fi
}

# Function to cleanup incomplete files
function handleCtrlC() {
  echo ""
  throwError "Caught <Ctrl>+C, cleaning up..." false
  if [[ -n "$currentOutputFile" && -f "$currentOutputFile" ]]; then
    local fileName="$(basename -- "$currentOutputFile")"
    echo -e "Removing incomplete file: $fileName"
    rm -f "$currentOutputFile"
  fi
  exit 1
}

# Function to display help
function displayHelp() {
  echo "Usage: compress-copy.sh -i <inputPath> [options]"
  echo ""
  echo "Options:"
  echo "  -i, --inputPath <inputPath>   Specify the input path."
  echo "  -preset <presetValue>         Specify the preset value (default: fast)."
  echo "                                Valid presets: ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow, placebo."
  echo "  -crf <value>                  Specify the CRF value (default: 23)."
  echo "                                Valid range: 0-51."
  echo "  -h, --help                    Display this help message and exit."
  echo "  -r, --rename <inputPath>      Rename the processed files to remove the trailing \"-p\" in their name."
}
