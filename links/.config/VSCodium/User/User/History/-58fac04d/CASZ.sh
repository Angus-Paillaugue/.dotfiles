#!/bin/bash


GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

function displayHelp() {
  echo "Usage: yt-playlist-dl [OPTIONS]"
  echo "Download YouTube playlists or songs"
  echo ""
  echo "Options:"
  echo "  -h, --help           Display this help message"
  echo "  -p, --playlist       input playlist ID"
  echo "  -pn, --playlist-name input playlist name"
  echo "  -s, --song           input song ID"
}

# Args preocessing
while [ "$1" != "" ]; do
  case $1 in
    -h | --help )
      displayHelp
      exit 0
      ;;
    -p | --playlist )
      shift
      playlistId="$1"
      exit 0
      ;;
    -pn | --playlist-name )
      shift
      playlistName="$1"
      exit 0
      ;;
    -s | --song )
      shift
      songId="$1"
      exit 0
      ;;
    *)
      echo -e "${RED}Unknown option${NC}: $1"
      displayHelp
      exit 1
  esac
  shift
done



if [ -n "$playlistName" ] && [ -n "$playlistId" ]; then
  echo "Downloading playlist: $playlistName"
  cd ~/Music
  mkdir -p "$playlistName"
  cd "$playlistName"
  yt-dlp -x --audio-format mp3 --audio-quality 320k --cookies-from-browser chrome --embed-thumbnail --embed-metadata --download-archive _songs.txt -o "%(uploader)s - %(title)s.%(ext)s" "https://www.youtube.com/playlist?list=$playlistId"
fi

if [ -n "$songId" ]; then
  cd ~/Music
  yt-dlp -x --audio-format mp3 --audio-quality 320k --cookies-from-browser chrome --embed-thumbnail --embed-metadata -o "%(uploader)s - %(title)s.%(ext)s" "https://www.youtube.com/watch?v=$songId"
fi
