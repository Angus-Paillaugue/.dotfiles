#!/bin/bash

files=$(find ./links -type f)
no_files_to_install="$(find ./links -type f | wc -l)"
no_files_installed=0
progress_bar_char_length=30

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
  printf "\rProgress: [%s%s] %d%%" "$progress_bar" "$unfilled" "$percent"
  no_files_installed=$((no_files_installed + 1))
done
