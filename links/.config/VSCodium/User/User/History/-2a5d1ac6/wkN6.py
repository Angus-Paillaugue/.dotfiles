import os
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from seleniumwire import webdriver

# Set up Chrome options
options = Options()
options.add_argument("--headless")  # Run in headless mode
options.add_argument("--window-size=1920,1080")  # Set window size

# Set up Chrome driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# Set up Selenium Wire to capture network requests
driver.scopes = ['.']  # Capture all requests

# Function to scroll to the bottom of the page
def scroll_to_bottom(driver):
    last_height = driver.execute_script("return document.body.scrollHeight")
    while True:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        driver.implicitly_wait(2)  # Wait for 2 seconds
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

# Function to get all network requests
def get_network_requests(driver):
  requests = []
  for request in driver.requests:
    requests.append({
        'method': request.method,
        'url': request.url,
        'response': {
            'status_code': request.response.status_code,
            'headers': dict(request.response.headers),
            'body': request.response.body
        }
    })
  return requests

# Navigate to the webpage
url = 'https://onlyfans.com/xeilth/media'  # Replace with the URL you want to scrape
driver.get(url)

# Scroll to the bottom of the page
scroll_to_bottom(driver)

# Get all network requests
requests = get_network_requests(driver)

# Export network requests to a JSON file
with open('network_requests.json', 'w') as f:
  json.dump(requests, f, indent=4)

# Close the driver
driver.quit()
