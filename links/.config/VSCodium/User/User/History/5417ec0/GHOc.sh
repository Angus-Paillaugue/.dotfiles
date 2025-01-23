#!/bin/sh

inputDir="$(dirname "$0")/vw-data/"
outputDir="/mnt/hdd2/vaultwarden-backup/vw-wdata/"

if [[ -d "$outputDir" ]]; then
  mkdir -p $outputDir
fi

rsync -arv --delete $inputDir $outputDir
