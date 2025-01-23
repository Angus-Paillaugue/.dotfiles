#!/bin/bash

options=(
  "dev"
  "format"
  "build"
  "docker test dev"
  "docker test prod"
  "docker push"
)

for i in ${!options[@]}; do
  echo "[$i] ${options[$i]}"
done
