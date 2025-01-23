#!/bin/bash

files=$(ls -1 *.java)
for file in $files
do
	echo $file
done
