#!/bin/bash

url="https://video-proxy.twinkaboo.com/3c/ee/fe3e-6110-4feb-ab01-d8d2c7e64851/720p/video"
videoName="18yo Liam Is Home Alone To Knock One Out"
noVideos=22
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
