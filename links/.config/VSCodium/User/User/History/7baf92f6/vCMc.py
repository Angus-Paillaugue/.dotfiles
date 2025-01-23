
import pyautogui as pg
import time
from download import clickConsole, save, clickNextButton, closeCurrentTab

def openImageInNewTab():
  clickConsole()
  pg.typewrite('window.open(document.querySelector(".pswp__item[aria-hidden=false] img.pswp__img").src, "_blank")')
  pg.typewrite(['enter'])

def downloadImages(number = 0):
  time.sleep(1)
  for _ in range(number):
    openImageInNewTab()
    time.sleep(1)
    save()
    time.sleep(.5)
    closeCurrentTab()
    clickNextButton()
    time.sleep(.5)
  print("Done downloading images.")
