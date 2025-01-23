#!/bin/bash

playlistName=$1
playlistId=$2

echo "Downloading playlist: $playlistName"
mkdir -p "$playlistName"
cd "$playlistName"

yt-dlp -x --audio-format mp3 --audio-quality 320k --cookies-from-browser chrome --embed-thumbnail --embed-metadata --download-archive _songs.txt -o "%(uploader)s - %(title)s.%(ext)s" "https://www.youtube.com/playlist?list=$playlistId"

for file in *.mp3; do
  id3tool -r "Pierre Perret" $file
done
