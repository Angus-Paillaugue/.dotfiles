#!/bin/bash

read -p "Enter the playlist ID: " playlistId

playlistName=$(yt-dlp "https://www.youtube.com/playlist?list=$playlistId"  --flat-playlist  --dump-single-json  | jq -r .title)

echo "Downloading playlist: $playlistName"
mkdir -p "$playlistName"
cd "$playlistName"

yt-dlp -x --audio-format mp3 --audio-quality 320k -u HellKeeper -p SUGNA4032 --embed-thumbnail --embed-metadata --download-archive _songs.txt -o "%(uploader)s - %(title)s.%(ext)s" "https://www.youtube.com/playlist?list=$playlistId"
