#!/bin/bash

files=$(ls -1 ./src/main/java/vues/*.java)
for file in $files
do
	filename=$(basename $file)
	filenameWithoutExt=${filename%.*}
	echo $filenameWithoutExt
done
