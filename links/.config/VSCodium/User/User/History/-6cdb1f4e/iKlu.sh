#!/bin/bash

url="https://video-proxy.twinkaboo.com/02/b5/4d25-0bbc-489a-a5c2-bfb5401576f7/720p/video"
videoName="18yo Pretty Boy Liam Services Daddys Big Dick"
noVideos=67
ext=".ts"
dir="video"

mkdir $dir

for i in $(seq 1 $noVideos)
do
  wget -O $dir/$i$ext $url$i$ext
  echo "file '$dir/$i$ext'" >> videos.txt
done

ffmpeg -f concat -i videos.txt -c copy "$videoName".mp4

rm -rf $dir
rm videos.txt
