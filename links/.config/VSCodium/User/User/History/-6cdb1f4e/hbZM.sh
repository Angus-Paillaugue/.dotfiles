#!/bin/bash

url="https://video-proxy.twinkaboo.com/9e/d3/ac0a-071f-4b2a-a3f7-08355dee1b9e/720p/video"
videoName="Pretty Boy Liam Finally Talks And Asks To Be Filled"
noVideos=22
ext=".ts"
dir="video"

for i in $(seq 1 $noVideos)
do
  wget -O $dir/$i$ext $url$i$ext
  echo "file '$dir/$i$ext'" >> $dir/videos.txt
done

ffmpeg -f concat -i $dir/videos.txt -c copy $videoName.mp4

rm -rf $dir
