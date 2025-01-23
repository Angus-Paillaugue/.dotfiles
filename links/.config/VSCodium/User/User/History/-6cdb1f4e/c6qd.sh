#!/bin/bash

url="https://video-proxy.twinkaboo.com/14/20/85b7-0621-458e-b7d9-2b655a3563a8/480p/video"
ext=".ts"
dir="video"
noVideos=259

# for i in $(seq 1 $noVideos)
# do
#   wget -O $dir/$i$ext $url$i$ext
# done

(for %i in (*.ts) do @echo file '%i') > list.txt
ffmpeg -safe 0 -f concat -i list.txt -c copy output.mp4
