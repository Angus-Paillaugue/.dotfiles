#!/bin/bash

# Rename all *.*.png files to *.png
for file in *.png; do
  newFileName=$(echo $file | sed 's/\.txt$/.png/')
  mv -- "$file" "$newFileName"
done
