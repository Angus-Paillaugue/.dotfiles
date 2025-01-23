#!/bin/bash

show_help() {
  echo "
    -h, --help              Shows this help message
    --username <username>   The username of the model you are downloading videos from
    --videos                To download the model's videos
    --images                To download the model's images
  "
  exit 0
}

# Args processing
username=""
download_images=false
download_videos=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
    --username) username="$2"; shift ;;
    --videos) download_videos=true ;;
    --images) download_images=true ;;
    -h|--help) show_help ;;
    *) echo "Error: unknown argument '$1'" ;;
  esac
  shift
done

if [[ -z "$username" ]]; then
  echo "Error: No username was passed!"
  exit 1
fi

spinner() {
  local pipe="$1"
  local symbols=("⣷" "⣯" "⣟" "⡿" "⢿" "⣻" "⣽" "⣾")

  while true; do
    while IFS= read -r line; do
      for c in "${symbols[@]}"; do
        echo -ne " $c $line"\\r
        sleep 0.1
      done
    done <"$pipe"
  done
}

download() {
  file_url="$1"
  file_title="$2"
  file_type="$3"
  extension=""

  if [[ "$file_type" == "video" ]]; then
    extension="mp4"
  elif [[ "$file_type" == "image" ]]; then
    extension="jpg"
  fi

  output_file_path="./download/${username}/${file_type}s/${file_title}.${extension}"

  mkdir -p "$(dirname "$output_file_path")"

  # Create a named pipe
  pipe=$(mktemp -u)
  mkfifo "$pipe"

  # Start the spinner
  spinner "$pipe" &
  spinner_pid=$!

  # Download the file
  { curl -L --progress-bar "$file_url" -o "$output_file_path" 2>&1 | awk '{ if(NR > 1) { print "Downloading '$file_title' (" $6 " left)" > "'$pipe'" } }'; } && {
    file_size=$(du -h "$output_file_path" | cut -f1)
    remaining_files=$((remaining_files - 1))

    # Kill the spinner
    kill $spinner_pid
    wait $spinner_pid 2>/dev/null
    echo -ne "\r✓ $file_title : $file_size (${remaining_files} to go)\n"
  } || {
    echo "${file_title}: Download failed" >> "./log.txt"

    # Kill the spinner
    kill $spinner_pid
    wait $spinner_pid 2>/dev/null
    echo -ne "\r✗ $file_title : Download failed\n"
  }

  # Remove the named pipe
  rm "$pipe"
}

download_type() {
  file_type="$1"
  mkdir -p "./download/${username}/${file_type}s/"

  if [[ ! -f "./download/${username}/${file_type}s.json" ]]; then
    echo "Error: ${file_type}s.json file not found!"
    exit 1
  fi

  files=$(jq -c '.[]' "./download/${username}/${file_type}s.json")
  remaining_files=$(echo "$files" | wc -l)

  for file in $files; do
    file_url=$(echo "$file" | jq -r '.url')
    file_title=$(echo "$file" | jq -r '.title')
    download "$file_url" "$file_title" "$file_type"
  done
}

if $download_videos; then
  echo "Downloading videos..."
  download_type "video"
fi

if $download_images; then
  echo "Downloading images..."
  download_type "image"
fi
