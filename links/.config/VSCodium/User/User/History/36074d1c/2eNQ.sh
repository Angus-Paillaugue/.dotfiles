#!/bin/bash

# Rename all *.*.png files to *.png
for file in *.txt; do
  newFileName=$(echo $file | sed 's/\.txt$/.png/')
  mv -- "$file" "$newFileName"
done
