#!/bin/bash

function generateRandomString() {
  tr -dc 'A-Za-z0-9' < /dev/urandom | head -c 64
}

function getDotEnvValue() {
  # Check if file exists
  if [ ! -f $1 ]; then
    echo $(generateRandomString)
  fi
  # Check if the key exists
  if ! grep -q $2 $1; then
    echo $(generateRandomString)
  fi
  # Else return the value
  echo $(grep $2 $1 | cut -d '=' -f2)
}
