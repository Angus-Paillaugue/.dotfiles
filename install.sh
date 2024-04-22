#!/bin/bash

RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

# If no dotfiles are in the liks directory
if [ ! -d "./links" ]; then
  echo -e "${RED} Error: ${ENDCOLOR}No links directory"
  exit 1
fi

no_files_to_install="$(find ./links -type f | wc -l)"
no_files_installed=0
progress_bar_char_length=35
# Directorie walker
find ./links -type f -print0 | while IFS= read -r -d '' file; do
  # Calculate percentage
  percent=$(($no_files_installed * 100 / $no_files_to_install))

  # Calculate how many characters should be filled in the progress bar
  filled_chars=$(($percent * $progress_bar_char_length / 100))

  # Create the progress bar string
  progress_bar=$(printf "%-${filled_chars}s" '#')
  progress_bar=${progress_bar// /#}
  unfilled=$(printf "%-$(($progress_bar_char_length - $filled_chars))s" ' ')
  unfilled=${unfilled// /-}

  # Print the progress bar
  printf "\r[%s%s] %d%%" "$progress_bar" "$unfilled" "$percent"
  no_files_installed=$((no_files_installed + 1))
  # If is a file
  if [ -f "$file" ]; then
    file_path="${file/'./links'/$HOME}"
    file_name="$(basename -- "$file_path")"
    if [ ! -d "$file_path" ]; then
      # Creates a copy of the dotfile in the actual directory
      cp -r "$file" "$file_path"
      # echo -e "${GREEN}󰌷 ${ENDCOLOR}$file_path"
    # else
      # If the actual directory does not exists (program not installed)
      # echo -e "${RED}󰒬 ${ENDCOLOR}Skipping: $file_name (directory not found)"
    fi
  fi
done

echo -e "\n\n${GREEN} ${ENDCOLOR}Dotfiles installed successfully!"
