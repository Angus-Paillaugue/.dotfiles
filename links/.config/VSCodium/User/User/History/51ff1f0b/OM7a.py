import cfscrape
import json
import colorama
from datetime import datetime
from bs4 import BeautifulSoup
import requests
import re
from utils import extractProductId
from database import insertPriceToDb

colorama.init()

REQUESTS_MANAGER = cfscrape.CloudflareScraper()
GET = REQUESTS_MANAGER.get
POST = REQUESTS_MANAGER.post
JSON_TO_TABLE = json.loads
TABLE_TO_JSON = json.dumps
COLOR = colorama.Fore

WEBHOOKS = [
    'https://discord.com/api/webhooks/1259914268716044298/N6BdefaeyJRYCL6n2bQYja8VSSSU-d44rrQYGW3k0y4rQzVLhkp034xjmXW11MqXVllQ',
]

PRODUCTS = [
    'https://www.zalando.fr/diesel-fragrance-d-by-diesel-red-parfum-diu32i01g-s12.html'
]

LOGGING_COLORS = {
    "INFO": COLOR.CYAN,
    "LOG": COLOR.BLUE,
    "WARNING": COLOR.YELLOW,
    "ERROR": COLOR.RED,
}


def log(logType, message, details):
    logDate = str(datetime.now())

    logFile = open('logs.log', 'a+')

    if len(details) == 0:
        logFile.write(logDate + ' [%s] ' % (logType) + message + '\n')
        print(logDate + LOGGING_COLORS[logType] + ' [%s] ' %
              (logType) + message + COLOR.RESET)
    else:
        logFile.write(logDate + ' [%s] ' % (logType) +
                      message + ' | ' + TABLE_TO_JSON(details) + '\n')
        print(logDate + LOGGING_COLORS[logType] + ' [%s] ' %
              (logType) + message + ' | ' + TABLE_TO_JSON(details) + COLOR.RESET)

    logFile.close()


def send_message(content):

    for article in content:
        data = {
            "content": None,
            "embeds": [
                {
                    "description": "[%s](%s)" % (article['productName'], article['link']),
                    "color": None,
                    "fields": [
                        {
                            "name": "Price",
                            "value": article['currentPrice'],
                            "inline": True
                        },
                    ],
                    "thumbnail": {
                        "url": article['imageUrl']
                    }
                }
            ],
            "username": "᲼",
            "avatar_url": "https://avatars.githubusercontent.com/u/1564818?s=280&v=4"
        }

        for webhook in WEBHOOKS:
            log('LOG', 'Article Message Sent', {
                'WEBHOOK': webhook, 'ARTICLE-ID': article['zalandoId']})
            POST(webhook, json=data)


def scrapeProductPrice(url):
  response = requests.get(url)
  if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    metaTag = soup.find('meta', {'name': 'twitter:data1'})
    if metaTag:
      priceString = metaTag.get('content')
      # Use regex to extract numerical value and currency symbol
      match = re.match(r'([\d.,]+)\s*(\D+)', priceString.strip())
      if match:
        price = float(match.group(1).replace(',', '.'))  # Convert comma to dot for decimal values
        currency = match.group(2)
        return price, currency
    else:
      return None
  return None


if __name__ == '__main__':
    log('INFO', 'Zalando Scraper has been started', {})
    url = 'https://www.zalando.fr/diesel-fragrance-d-by-diesel-red-parfum-diu32i01g-s12.html'
    price = scrapeProductPrice(url)

    product = {
        'productName': 'Diesel Fragrance D by Diesel Red Parfum',
        'currentPrice': '€ 39,95',
        'imageUrl': 'https://img01.ztat.net/article/spp-media-p1/ee59a7b0527e475c828143903a9704dd/fda061da5f294a43abebbba68f5add8e.jpg?imwidth=1800&filter=packshot',
        'link': 'https://www.zalando.fr/diesel-fragrance-d-by-diesel-red-parfum-diu32i01g-s12.html',
        'zalandoId': 'DIU32I01G-S12'
    }


    send_message([product])
