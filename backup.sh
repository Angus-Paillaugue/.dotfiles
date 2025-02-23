#!/bin/bash

rm -rf links
mkdir -p links
backup_paths="./files_to_backup.txt"
RED="\e[31m"
GREEN="\e[32m"
ENDCOLOR="\e[0m"

while IFS= read -r file_path
do
  # Expand tilde to home directory
  clean_path="${file_path/\~\//}"  # Remove tilde
  full_path="$HOME/$clean_path"  # Remove tilde and prepend home_dir

  if [[ -f "$full_path" || -d "$full_path" ]]; then  # Check if file/directory exists
    # Create directory of where the file (or dir) is located relative to the `link` directory
    mkdir -p "./links/$(dirname "$clean_path")"
    # Create the copy of the actual file or dir
    cp -r "$full_path" "./links/$clean_path"
    echo -e "${GREEN}󰌷 ${ENDCOLOR}$clean_path"
  else
    echo -e "${RED}󰒬 ${ENDCOLOR}Skipping: $full_path (File/directory not found)"
  fi
done < <(cat "$backup_paths")

sleep 1
# Ask user if they want to push the changes
echo ""
read -p "Do you want to push the changes? (y/n): " execute
if [[ $execute == "y" ]]; then
  # Push changes to git
  date_time=$(date +%D" "%T)
  commit_message="Updated: $date_time"
  git add .
  git commit -m "$commit_message"
  git push
  echo -e "\n${RED} ${ENDCOLOR}Your changes have been pushed."
else
  # Skip push
  echo "Links have beed created but not synchronized with git."
fi
