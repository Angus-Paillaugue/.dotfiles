import pyautogui as pg
import coordinates
import time

def clickNextButton():
  pg.click(*coordinates.NEXT_BUTTON_COORDINATES)

def clickConsole():
  pg.click(*coordinates.CONSOLE_INPUT_COORDINATES)

def clickSaveButton():
  pg.click(*coordinates.SAVE_BUTTON_COORDINATES)

def save():
  pg.hotkey('ctrl', 's')
  time.sleep(1)
  clickSaveButton()

def closeCurrentTab():
  pg.hotkey('ctrl', 'w')
