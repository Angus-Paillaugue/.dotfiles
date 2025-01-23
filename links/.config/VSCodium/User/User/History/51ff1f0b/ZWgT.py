import cfscrape
import json
import colorama
from datetime import datetime
from bs4 import BeautifulSoup

colorama.init()

REQUESTS_MANAGER = cfscrape.CloudflareScraper()
GET = REQUESTS_MANAGER.get
POST = REQUESTS_MANAGER.post
JSON_TO_TABLE = json.loads
TABLE_TO_JSON = json.dumps
COLOR = colorama.Fore

DISCORD_BASIC_LOGGING = False

LOGGING_WEBHOOK = 'https://discord.com/api/webhooks/1259914268716044298/N6BdefaeyJRYCL6n2bQYja8VSSSU-d44rrQYGW3k0y4rQzVLhkp034xjmXW11MqXVllQ'

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

    detailsString = ''

    if (logType == 'LOG') and (DISCORD_BASIC_LOGGING == False):
        return

    for x in details:
        detailsString += '`%s = %s`\n' % (str(x), details[x])

    data = {
        "content": None,
        "embeds": [
            {
                "color": None,
                "fields": [
                    {
                        "name": "LOG TYPE",
                        "value": "`%s`" % (logType)
                    },
                    {
                        "name": "LOG MESSAGE",
                        "value": "`%s`" % (message)
                    },
                    {
                        "name": "LOG DETAILS",
                        "value": detailsString
                    },
                    {
                        "name": "TIME",
                        "value": "`%s`" % (logDate)
                    }
                ]
            }
        ],
        "username": "Zalando Scraper Logs",
        "avatar_url": "https://avatars.githubusercontent.com/u/1564818?s=280&v=4"
    }

    if len(details) == 0:
        data['embeds'][0]['fields'].remove(data['embeds'][0]['fields'][2])

    # POST(LOGGING_WEBHOOK, json=data)


def send_message(content):

    for article in content:

        sizeString = ''
        countryString = ''
        stockString = ''
        totalStock = 0

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
                        {
                            "name": "Release Date",
                            "value": article['releaseDate'],
                            "inline": True
                        },
                        {
                            "name": "Total Stock",
                            "value": totalStock,
                            "inline": True
                        }
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



if __name__ == '__main__':
    log('INFO', 'Zalando Scraper has been started', {})

    send_message([{
