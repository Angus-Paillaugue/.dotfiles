# require modules
from tkinter import *
from tkinter.filedialog import askdirectory
from tkinter.messagebox import showerror, showinfo

from pytube import YouTube


def download(link):
  path = "./"
  video = YouTube(link)

  try:
    file = video.streams.filter(only_audio=True).first()

    file.download(path)

  except:
    print("error in downloading audio")


download("https://music.youtube.com/watch?v=l41Oi0rbUXE&list=RDAMVMl41Oi0rbUXE")
