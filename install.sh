#!/bin/bash

RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

# If no dotfiles are in the liks directory
if [ ! -d "./links" ]; then
  echo -e "${RED} Error: ${ENDCOLOR}No links directory"
  exit 1
fi

# Directorie walker
find ./links -print0 | while IFS= read -r -d '' file
do
  # If is a file
  if [ -f "$file" ]; then
    file_path="${file/'./links'/$HOME}"
    file_name="$(basename -- "$file_path")"
    if [ ! -d "$file_path" ]; then
      # Creates a copy of the dotfile in the actual directory
      cp -r "$file" "$file_path"
      echo -e "${GREEN}󰌷 ${ENDCOLOR}$file_path"
    else
      # If the actual directory does not exists (program not installed)
      echo -e "${RED}󰒬 ${ENDCOLOR}Skipping: $file_name (directory not found)"
    fi
  fi
done

echo -e "\n${GREEN} ${ENDCOLOR}Dotfiles installed successfully!"
