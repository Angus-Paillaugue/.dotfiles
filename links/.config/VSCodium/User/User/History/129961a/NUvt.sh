#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color
currentOutputFile=""

function showHelp() {
  echo "
    -h, --help              Shows this help message
    --username <username>   The username of the model you are downloading videos from
    --videos                To download the model's videos
    --images                To download the model's images
  "
  exit 0
}

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
  echo -e "${RED}✖${NC} $1"
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

# Function to show spinner
function spinner() {
  local text="$1"
  local symbols="⣷ ⣯ ⣟ ⡿ ⢿ ⣻ ⣽ ⣾"

  while true; do
    for c in $symbols; do
      echo -ne " $c $text"\\r
      sleep 0.1
    done
  done
}


# Trap SIGINT (Ctrl+C) and call handleCtrlC function
trap handleCtrlC SIGINT
# Use trap to catch ERR and call the errorHandling function
trap 'errorHandling $LINENO $BASH_COMMAND' ERR SIGTERM

# Args processing
username=""
download_images=false
download_videos=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case $1 in
    --username) username="$2"; shift ;;
    --videos) download_videos=true ;;
    --images) download_images=true ;;
    -h|--help) showHelp ;;
    *) throwError "Error: unknown argument '$1'" ;;
  esac
  shift
done

if [[ -z "$username" ]]; then
  throwError "No username was passed!"
  showHelp
fi

# Function to download a file
function download() {
  fileUrl=$1
  fileTitle=$2
  fileType=$3
  extension=""
  currentOutputFile="./download/${username}/${fileType}s/${fileTitle}"

  if [[ "$fileType" == "video" ]]; then
    extension="mp4"
  elif [[ "$fileType" == "image" ]]; then
    extension="jpg"
  fi

  output_file_path="./download/${username}/${fileType}s/${fileTitle}.${extension}"

  mkdir -p "$(dirname "$output_file_path")"

  # Start the spinner
  spinner "Downloading $fileTitle" &
  spinnerPid=$!

  # Download the file
  if curl -L --fail "$fileUrl" -o "$output_file_path" 2>/dev/null; then
    file_size=$(du -h "$output_file_path" | cut -f1)
    remaining_files=$((remaining_files - 1))
    # Kill the spinner
    kill $spinnerPid
    wait $spinnerPid 2>/dev/null
    echo -ne "\r${GREEN}✓${NC} $fileTitle : $file_size (${remaining_files} to go)\n"
  else
    echo "${fileTitle}: Download failed" >> "./log.txt"
    # Kill the spinner
    kill $spinnerPid
    wait $spinnerPid 2>/dev/null
    echo -ne "\r${RED}✗${NC} $fileTitle : Download failed\n"
  fi
}

# Function to download a type of file
function downloadType() {
  fileType=$1
  mkdir -p "./download/${username}/${fileType}s/"

  if [[ ! -f "./download/${username}/${fileType}s.json" ]]; then
    throwError "${fileType}s.json file not found for $username !"
    exit 1
  fi

  files=$(jq -c '.[]' "./download/${username}/${fileType}s.json")
  remaining_files=$(echo "$files" | wc -l)

  for file in $files; do
    fileUrl=$(echo "$file" | jq -r '.url')
    fileTitle=$(echo "$file" | jq -r '.title')
    download "$fileUrl" "$fileTitle" "$fileType"
  done
}

if $download_videos; then
  echo "Downloading videos..."
  downloadType "video"
fi

if $download_images; then
  echo "Downloading images..."
  downloadType "image"
fi
