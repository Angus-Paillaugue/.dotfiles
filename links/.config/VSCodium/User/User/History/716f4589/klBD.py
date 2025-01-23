import sqlite3
from datetime import datetime, timedelta

DATABASE_FILE = 'database.db'

def createDatabase():
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS prices (
        productId TEXT,
        price INTEGER,
        currency TEXT,
        date TEXT
    );
    ''')
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        productId TEXT PRIMARY KEY,
        url TEXT,
        tracked BOOLEAN DEFAULT 1
    )
    ''')
    conn.commit()
    conn.close()

def addProductToDb(productId, productUrl):
    try:
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT OR IGNORE INTO products (productId, url, tracked)
            VALUES (?, ?, ?)
        ''', (productId,productUrl,1))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error tracking product: {e}")
        return False
    finally:
        conn.close()

def insertPriceToDb(productId, price, currency):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''
    INSERT INTO prices (productId, price, currency, date)
    VALUES (?, ?, ?, ?)
    ''', (productId, price, currency, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    conn.commit()
    conn.close()

def fetchStalePrices(minutesDelta=1):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    # Calculate the timestamp one minute ago
    triggerTime = datetime.now() - timedelta(minutes=minutesDelta)
    # Fetch latest prices for products whose prices have not been updated within the last minute
    cursor.execute('''
    SELECT p.productId, pr.url, p.price, p.currency, p.date
    FROM prices p, products pr
    WHERE
    pr.productId = p.productId
    AND (p.productId, p.date) IN (
        SELECT productId, MAX(date) FROM prices GROUP BY productId
    )
    AND p.date <= ?
    AND pr.tracked = 1
    ''', (triggerTime.strftime('%Y-%m-%d %H:%M:%S'),))
    rows = cursor.fetchall()
    conn.close()
    return rows

def getProductPrices(productId, startDate=None):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''
    SELECT * FROM prices WHERE prices.productId = ? AND prices.date > ? ORDER BY date DESC
    ''', (productId, startDate or '1970-01-01 00:00:00'))
    rows = cursor.fetchall()
    conn.close()
    return rows

def updateTrackingStatus(productId, tracked):
    try:
        conn = sqlite3.connect(DATABASE_FILE)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE products
            SET tracked = ?
            WHERE productId = ?
        ''', (tracked, productId))
        conn.commit()
        return True
    except Exception as e:
        print(f"Error updating tracking status: {e}")
        return False
    finally:
        conn.close()

def getProductFromUrl(url):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''
    SELECT productId FROM products WHERE url = ?
    ''', (url,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

def productExistsInDb(productId):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''
    SELECT productId FROM products WHERE productId = ?
    ''', (productId,))
    row = cursor.fetchone()
    conn.close()
    return row is not None

def getLatestPrice(productId):
    conn = sqlite3.connect(DATABASE_FILE)
    cursor = conn.cursor()
    cursor.execute('''
    SELECT price, currency FROM prices WHERE productId = ? ORDER BY date DESC LIMIT 1
    ''', (productId,))
    row = cursor.fetchone()
    conn.close()
    return row
