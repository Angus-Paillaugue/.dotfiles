#!/bin/bash

files=$(ls -1 ./src/main/java/vues/*.java)
for file in $files
do
	filename=$(basename $file)
	filenameWithoutExt=${filename%.*}
	echo $filenameWithoutExt
done
select character in Sheldon Leonard Penny Howard Raj
do
    echo "Selected character: $character"
    echo "Selected number: $REPLY"
done
