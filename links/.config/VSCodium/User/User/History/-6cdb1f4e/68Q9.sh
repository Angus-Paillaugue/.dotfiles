#!/bin/bash

url="https://video-proxy.twinkaboo.com/14/20/85b7-0621-458e-b7d9-2b655a3563a8/480p/video"
ext=".ts"
dir="video"
noVideos=259
videoName="Pretty Boy Liam Finally Talks And Asks To Be Filled"

for i in $(seq 1 $noVideos)
do
  wget -O $dir/$i$ext $url$i$ext
  echo "file '$dir/$i$ext'" >> $dir/videos.txt
done

ffmpeg -f concat -i $dir/videos.txt -c copy $videoName.mp4

rm -rf $dir
