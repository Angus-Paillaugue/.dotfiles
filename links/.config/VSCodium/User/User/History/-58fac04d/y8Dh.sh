#!/bin/bash

read -p "Enter the playlist ID: " playlistId

playlistName=$(yt-dlp "https://www.youtube.com/playlist?list=$playlistId"  --flat-playlist  --dump-single-json  | jq -r .title)

echo "Downloading playlist: $playlistName"
mkdir -p "$playlistName"
cd "$playlistName"

yt-dlp -x --audio-format flac --audio-quality 320k --embed-thumbnail --embed-metadata -o "%(uploader) - %(title)s.%(ext)s" "https://www.youtube.com/playlist?list=$playlistId"
