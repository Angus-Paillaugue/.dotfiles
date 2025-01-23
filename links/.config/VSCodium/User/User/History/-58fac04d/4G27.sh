#!/bin/bash


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

