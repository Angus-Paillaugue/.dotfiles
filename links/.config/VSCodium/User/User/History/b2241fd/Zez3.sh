#!/bin/bash

randomString=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
echo $randomString >> ./test.txt
# while true ; do
# done
