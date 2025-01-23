#!/bin/bash

# Rename all *.txt to *.text
for file in *.txt; do
  mv -- "$file" "${file%.txt}.png"
done
