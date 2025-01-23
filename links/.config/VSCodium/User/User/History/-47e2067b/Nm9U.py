# require modules
from pytube import YouTube
import os


def download(link):
  path = "./"
  video = YouTube(link)
  try:
    file = video.streams.filter(only_audio=True).first()

    file.download(path)
  except:
    print("error in downloading audio")


# download("https://music.youtube.com/watch?v=l41Oi0rbUXE&list=RDAMVMl41Oi0rbUXE")


def dlPlaylist(link, name):
  os.mkdir(name)
  path = "./" + name + "/"
  playlist = YouTube(link)
  try:
    for video in playlist.videos:
      file = video.streams.filter(only_audio=True).first()
      file.download(path)
  except:
    print("error in downloading playlist")

dlPlaylist("https://music.youtube.com/playlist?list=PLR44HyGlHjRnuKXzu0-LdwPZdzjOyIPF6", "Moment")
