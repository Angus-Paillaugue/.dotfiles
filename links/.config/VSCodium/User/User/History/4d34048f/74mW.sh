#!/bin/bash

scripts=(
  (
    name="copy-backup"
    description="Copy backup files to the home-server."
  ),
  (
    name="video-compressor"
    description="Compress all videos in a directory."
  ),
  (
    name="images-compressor"
    description="Compress all images in a directory."
  )
)

for script in "${scripts[@]}"; do
  echo "Name: ${script.name}"
  echo "Description: ${script.description}"
done
