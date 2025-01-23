
<br/>
<div align="center">
  <img src="https://www.logo.wine/a/logo/YouTube/YouTube-Icon-Full-Color-Logo.wine.svg" alt="Logo" height="100">
  <h1 align="center">Automatic Video Compressor</h1>
</div>

## Introduction
This simple bash script is used to compress large amount of videos in a directory.

## Getting Started
### Prerequisites
You ned to have Ffmpeg installed on your system (Follow the installation guides [here](https://www.ffmpeg.org/download.html))

### Installation
To install this tool globally, just tun the install script (`./install.sh`). You can now run the script via the `yt-dl` command!

### Usage
#### Download an entire playlist
To download a whole playlist, use the `-p` and `-pn` flags like so :
`yt-dl -p "Playlist ID" -pn "Playlist name"`
The playlist will be downloaded in your [~/Videos](~/Videos) directory.
A file named _songs.txt will be create. It stores the already downloaded songs so, if you add one or multiple songs to your playlist, only those one will be downloaded when re-running the download command.

#### Download a single song
To download a single song, use the `-s` flag like so :
`yt-dl -s "Song ID"`
The song will be downloaded in your [~/Videos](~/Videos) directory.



```sh
Usage: yt-dl [OPTIONS]
Download YouTube playlists or songs

Options:
  -h, --help           Display this help message
  -p, --playlist       input playlist ID
  -pn, --playlist-name input playlist name
  -s, --song           input song ID
```
