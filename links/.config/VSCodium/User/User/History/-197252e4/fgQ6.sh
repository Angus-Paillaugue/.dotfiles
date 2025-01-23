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

# Choice
read -p "Choose an option: " choice

case $choice in
  0)
    bash ./dev.sh
    ;;
  1)
    # Format the code
    pnpm format
    ;;
  2)
    # Build the code
    pnpm build
    ;;
  3)
    # Test the code in a Docker container
    docker-compose -f docker-compose.dev.yml up --build --abort-on-container-exit
    ;;
  4)
    # Test the code in a Docker container
    docker-compose -f docker-compose.prod.yml up --build --abort-on-container-exit
    ;;
  5)
    # Push the Docker image to the registry
    docker push username/repo:tag
    ;;
  *)
    echo "Invalid option"
    ;;
esac
