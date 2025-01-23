#!/bin/bash

options=(
  "dev"
  "format"
  "build"
  "docker test dev"
  "docker test prod"
  "docker push"
)

for str in ${myArray[@]}; do
  echo $str
done

