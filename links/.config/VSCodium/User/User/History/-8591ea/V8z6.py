
import pyautogui as pg
import time
import 

def clickNextButton():
  pg.click(*NEXT_BUTTON_COORDINATES)

def clickConsole():
  pg.click(*CONSOLE_INPUT_COORDINATES)

def openImageInNewTab():
  clickConsole()
  pg.typewrite('window.open(document.querySelector(".pswp__item[aria-hidden=\\"false\\"] video source[label=original]").src, "_blank")')
  pg.typewrite(['enter'])

def closeCurrentTab():
  pg.hotkey('ctrl', 'w')

def clickSaveButton():
  pg.click(1657, 576)

def saveImage():
  pg.hotkey('ctrl', 's')
  time.sleep(1)
  clickSaveButton()

def downloadVideos(number = 0):
  time.sleep(1)
  for _ in range(number):
    openImageInNewTab()
    time.sleep(1)
    saveImage()
    time.sleep(.5)
    closeCurrentTab()
    clickNextButton()
    time.sleep(.5)
  print("Done downloading videos.")

if __name__ == "__main__":
  downloadVideos()
