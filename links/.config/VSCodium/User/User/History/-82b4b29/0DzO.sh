#!/bin/bash

inputPath=$1

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color


# Flags
preset="fast" # Default value for the preset
valid_presets=("ultrafast" "superfast" "veryfast" "faster" "fast" "medium" "slow" "slower" "veryslow" "placebo")

while [ "$1" != "" ]; do
  case $1 in
    -preset )
      shift
      preset=$1
      echo -e " $GREEN✓$NC Using preset $preset"
      ;;
  esac
  shift
done

# Validate preset
if [[ ! " ${valid_presets[@]} " =~ " ${preset} " ]]; then
  echo -e "$REDError:$NC Invalid preset value '$preset'. Valid options are: ${valid_presets[*]}"
  exit 1
fi
# Error handling
if [ -z "$inputPath" ]; then
  echo "Usage: compress.sh <inputPath>"
  exit 1
fi
if [ ! -d "$inputPath" ]; then
  echo -e " $RED✗$NC $inputPath is not a valid directory"
  exit 1
fi

function spinner() {
  local text="$1"
  local UNI_DOTS="⠋ ⠙ ⠹ ⠸ ⠼ ⠴ ⠦ ⠧ ⠇ ⠏"
  local UNI_DOTS2="⣾ ⣽ ⣻ ⢿ ⡿ ⣟ ⣯ ⣷"
  local UNI_DOTS3="⣷ ⣯ ⣟ ⡿ ⢿ ⣻ ⣽ ⣾"
  local UNI_DOTS4="⠋ ⠙ ⠚ ⠞ ⠖ ⠦ ⠴ ⠲ ⠳ ⠓"
  local UNI_DOTS5="⠄ ⠆ ⠇ ⠋ ⠙ ⠸ ⠰ ⠠ ⠰ ⠸ ⠙ ⠋ ⠇ ⠆"
  local UNI_DOTS6="⠋ ⠙ ⠚ ⠒ ⠂ ⠂ ⠒ ⠲ ⠴ ⠦ ⠖ ⠒ ⠐ ⠐ ⠒ ⠓ ⠋"
  local UNI_DOTS7="⠁ ⠉ ⠙ ⠚ ⠒ ⠂ ⠂ ⠒ ⠲ ⠴ ⠤ ⠄ ⠄ ⠤ ⠴ ⠲ ⠒ ⠂ ⠂ ⠒ ⠚ ⠙ ⠉ ⠁"
  local UNI_DOTS8="⠈ ⠉ ⠋ ⠓ ⠒ ⠐ ⠐ ⠒ ⠖ ⠦ ⠤ ⠠ ⠠ ⠤ ⠦ ⠖ ⠒ ⠐ ⠐ ⠒ ⠓ ⠋ ⠉ ⠈"
  local UNI_DOTS9="⠁ ⠁ ⠉ ⠙ ⠚ ⠒ ⠂ ⠂ ⠒ ⠲ ⠴ ⠤ ⠄ ⠄ ⠤ ⠠ ⠠ ⠤ ⠦ ⠖ ⠒ ⠐ ⠐ ⠒ ⠓ ⠋ ⠉ ⠈ ⠈"

  local SYMBOLS="${!2:-$UNI_DOTS3}"
  while true; do
    for c in $SYMBOLS; do
      echo -ne " $c $text"\\r
      sleep 0.1
    done
  done

}

start=`date +%s`
files=$(find "$inputPath" -maxdepth 1 -type f \( -iname "*.mp4" -o -iname "*.mov" \))
numberOfFiles=$(echo "$files" | wc -l)
# If no files found in $inputPath, exit
if [ $numberOfFiles -eq 0 ]; then
  echo -e " $RED✗$NC No videos found in $inputPath"
  exit 1
fi
echo -e " $GREEN✓$NC Found $numberOfFiles files to compress"
originalDirSizeHR=$(du -h -s "$inputPath" | cut -f1)
originalDirSize=$(du -s "$inputPath")

filesToGo=$numberOfFiles
# Loop through files in inputPath
for file in $files; do
  # Check if file is a regular file
  if [ -f "$file" ]; then
    # Extracting file information
    filePath="$(dirname -- "$file")"
    fileName="$(basename -- "$file")"
    fileNameWithoutExtension="${fileName%.*}"
    extension="${fileName##*.}"
    outputName="$filePath/$fileNameWithoutExtension-out.$extension"
    # Get the original file size
    baseSize=$(du -h "$file" | cut -f1)

    # Actual compression
    ffmpeg -i "$file" -vcodec libx265 -crf 23 -preset "$preset" "$outputName" > /dev/null 2>&1 &
    videoPid=$!
    # Displays the spinner and waits for the videoPid to finish
    spinner "Compressing $fileName ($RED$baseSize$NC)" &
    spinnerPid=$!
    wait $videoPid
    kill $spinnerPid

    # Get the new file size
    newSize=$(du -h "$outputName" | cut -f1)
    # Renaming the output file to the original file
    rm "$file"
    mv "$outputName" "$file"
    filesToGo=$((filesToGo-1))
    echo -e " $GREEN✓$NC $fileName : $RED$baseSize$NC → $GREEN$newSize$NC ($YELLOW-$filesToGo$NC to go)"
  fi
done

# Print total time taken to compress all files
end=`date +%s`
runtime=$((end-start))
echo -n " 👍 All done in "
T=$runtime
D=$((T/60/60/24))
H=$((T/60/60%24))
M=$((T/60%60))
S=$((T%60))
(( $D > 0 )) && echo -n "$D days "
(( $H > 0 )) && echo -n "$H hours "
(( $M > 0 )) && echo -n "$M minutes "
(( $D > 0 || $H > 0 || $M > 0 )) && echo -n "and "
echo "$S seconds"

# Calculates and prints the compression rate
finalDirSizeHr=$(du -h -s "$inputPath" | cut -f1)
finalDirSize=$(du -s "$inputPath")
compressionRate=$(echo "scale=2; ($originalDirSize - $finalDirSize) / $originalSize * 100" | bc)
echo -e " $GREEN✓$NC Reduced the directory size by $YELLOW$compressionRate$NC% : $RED$originalDirSizeHR$NC → $GREEN$finalDirSizeHr$NC"
