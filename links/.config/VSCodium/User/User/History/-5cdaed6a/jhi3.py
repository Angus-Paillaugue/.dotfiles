import json
import os
import unicodedata
import subprocess
import re
import uuid

mainDir = os.path.dirname(os.path.realpath(__file__))

# Clean the videos titles
def slugify(value):
  value = str(value)
  value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
  value = re.sub(r'[^\w\s-]', '', value.lower())
  return re.sub(r'[-\s]+', '-', value).strip('-_')

# Clean up videos.json
def cleanUpVideos(username):
  try:
    filePath = os.path.join(mainDir,f'download/{username}/videos.json')
    with open(filePath, "r") as videosRequestsFile:
      properVideoFile = []
      videosRequests = json.load(videosRequestsFile)
      for request in videosRequests:
        for videos in request["list"]:
          for video in videos["media"]:
            text = slugify(videos["rawText"][:50]) if videos["rawText"] != None else str(uuid.uuid4())
            if video["source"]["source"] != None and video["source"]["source"] != "null" and video["source"]["source"] != "undefined" and video["type"] == "video":
              for existingVideo in properVideoFile:
                if existingVideo["title"] == text:
                  text += str(uuid.uuid4())
              properVideoFile.append({ "url":video["source"]["source"], "title":text })

        with open(filePath, "w") as outFile:
          outFile.write(json.dumps(properVideoFile, indent=4))
  except Exception as e:
    print(e)
  print(f"The videos are probably already cleaned !\n{len(properVideoFile)} videos left")


# Clean up images.json
def cleanUpImages(username):
    try:
        filePath = os.path.join(mainDir,f'download/{username}/images.json')
        with open(filePath, "r") as imagesRequestsFile:
            properImageFile = []
            imagesRequests = json.load(imagesRequestsFile)
            for request in imagesRequests:
                for images in request["list"]:
                    text = slugify(images["rawText"][:50]) if images["rawText"] != None else str(uuid.uuid4())
                    for i, image in enumerate(images["media"], start=1):
                        if image["source"]["source"] != None or image["source"]["source"] != "null" or image["source"]["source"] != "undefined" or image["type"] == "image":
                            properImageFile.append({ "url":image["source"]["source"], "title":f"{text}({i})", "postedAt":image["createdAt"] })

        with open(filePath, "w") as outFile:
            outFile.write(json.dumps(properImageFile, indent=4))
    except Exception as e:
        print(e)
    print(f"The images are probably already cleaned !\n{len(properImageFile)} images left")

def download(username):
    subprocess.run(["node", os.path.join(mainDir,"download.js"), f"--username={username}"])


if __name__ == "__main__":
    username = input("What is the username of the onlyfans : ")

    cleanUpVideosInput = input("Clean up videos ? (y: yes, n : no) : ")
    if( cleanUpVideosInput == "y" or cleanUpVideosInput == "yes" ):
        cleanUpVideos(username)

    cleanUpImagesInput = input("Clean up images ? (y: yes, n : no) : ")
    if( cleanUpImagesInput == "y" or cleanUpImagesInput == "yes" ):
        cleanUpImages(username)

    dlChoice = input("Do you now want to download ? (y: yes, n:no) : ")
    if( dlChoice == "y" or dlChoice == "yes" ):
        download(username)
