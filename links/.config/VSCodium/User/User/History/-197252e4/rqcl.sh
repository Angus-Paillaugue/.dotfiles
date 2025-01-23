#!/bin/bash

options=(
  "dev"
  "format"
  "build"
  "docker test dev"
  "docker test prod"
  "docker push"
)

for str in ${options[@]}; do
  echo $str
done
