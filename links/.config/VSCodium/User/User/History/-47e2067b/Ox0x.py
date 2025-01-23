# require modules
from pytube import YouTube
import os
import subprocess


def download(link, path="./"):
  yt = YouTube(link)
  try:
    file = yt.streams.filter(only_audio=True).first()
    file.download(output_path=path)
    default_filename = file.default_filename
    new_filename = default_filename.split(".")[0] + ".mp3"
    subprocess.run([
      'ffmpeg',
      '-i', os.path.join(path, default_filename),
      os.path.join(path, new_filename)
    ])
    subprocess.run([
      'rm',
      os.path.join(path, default_filename)
    ])
  except:
    print("error in downloading audio")


download("https://music.youtube.com/watch?v=l41Oi0rbUXE&list=RDAMVMl41Oi0rbUXE")


# def dlPlaylist(link, name):
#   os.mkdir(name)
#   path = "./" + name + "/"
#   playlist = YouTube(link)
#   try:
#     for video in playlist.videos:
#       yt = video.streams.filter(only_audio=True).first()
#       yt.download(output_path=path)
#   except:
#     print("error in downloading playlist")

# dlPlaylist("https://music.youtube.com/playlist?list=PLR44HyGlHjRnuKXzu0-LdwPZdzjOyIPF6", "Moment")
