#!/bin/bash

read -p "Enter the playlist ID: " playlistId

mkdir

yt-dlp -x --audio-format flac --audio-quality 320k --embed-thumbnail --embed-metadata -o "%(uploader) - %(title)s.%(ext)s" "https://www.youtube.com/playlist?list=$playlistId"
