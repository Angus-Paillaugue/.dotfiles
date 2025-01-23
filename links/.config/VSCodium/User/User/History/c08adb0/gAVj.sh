#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color
LOCAL_BACKUPS_DIR=~/Documents/backup
SERVER_BACKUPS_DIR=root@server.local/mnt/hdd/pc-backup

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
  echo "  -i, --inputPath <inputPath>    Specify the input path."
  echo "                                 Ex: ~/Backups"
  echo "  -o, --outputPath <inputPath>   Specify the output path."
  echo "                                 Ex: root@server/Backups"
}

# Trap SIGINT (Ctrl+C) and call handleCtrlC function
trap handleCtrlC SIGINT
# Use trap to catch ERR and call the errorHandling function
trap 'errorHandling $LINENO $BASH_COMMAND' ERR SIGTERM


preset="fast" # Default value for the preset
valid_presets=("ultrafast" "superfast" "veryfast" "faster" "fast" "medium" "slow" "slower" "veryslow" "placebo")
crf=23 # Default value for the crf to 23 (best I found for my use case)
inputPath=""
validFormats=("mp4" "mov" "avi" "mkv") # Valid video formats

# Parse the arguments
while [ "$1" != "" ]; do
  case $1 in
    -h | --help )
      displayHelp
      exit 0
      ;;
    -r | --rename )
      shift
      renameFiles "$1"
      exit 0
      ;;
    -i | --inputPath )
      shift
      inputPath="$1"
      ;;
    -preset )
      shift
      preset="$1"
      ;;
    -crf )
      shift
      crf="$1"
      ;;
    *)
      echo -e "${RED}Unknown option${NC}: $1"
      displayHelp
      exit 1
  esac
  shift
done
# Validate inputPath
if [ -z "$inputPath" ]; then
  throwError "Input path is required."
  displayHelp
  exit 1
fi

rsync -avz --progress "$LOCAL_BACKUPS_DIR" "$SERVER_BACKUPS_DIR"
