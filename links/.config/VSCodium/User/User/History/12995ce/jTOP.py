import pyautogui as pg
import coordinates

def clickNextButton():
  pg.click(*coordinates.NEXT_BUTTON_COORDINATES)

def clickConsole():
  pg.click(*coordinates.CONSOLE_INPUT_COORDINATES)
