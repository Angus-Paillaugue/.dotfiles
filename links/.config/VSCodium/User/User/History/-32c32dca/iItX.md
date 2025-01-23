# Usage
1) Create a directory named the same as the model you want to download content from inside the download directory
2) Export the `.har` file from chrome with all of the media (not just videos or images) inside the previously created directory.
3) Run the `pnpm run cleanup` script and follow the prompts.
4) You can now download the contents vy running the `pnpm run dl` command. Be sure to pass the `--username=<username>` flag and the `--videos` or `--images` flags
