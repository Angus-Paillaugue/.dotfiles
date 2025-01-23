#!/bin/bash

docker build -t ownlogs/docs .

docker compose up -d
