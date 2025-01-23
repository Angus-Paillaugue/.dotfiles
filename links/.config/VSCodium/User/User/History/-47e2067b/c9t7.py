import argparse
from pytube import YouTube

VIDEO_DOWNLOAD_DIR = "./"
AUDIO_DOWNLOAD_DIR = "./"


def YoutubeAudioDownload(video_url):
    video = YouTube(video_url)
    audio = video.streams.filter(only_audio = True).first()

    try:
        audio.download(AUDIO_DOWNLOAD_DIR)
    except:
        print("Failed to download audio")

    print("audio was downloaded successfully")

def YoutubeVideoDownload(video_url):
    video = YouTube(video_url)
    video = video.streams.get_highest_resolution()

    try:
        video.download(VIDEO_DOWNLOAD_DIR)
    except:
        print("Unable to download video at this time!")

    print("Video downloaded!")
