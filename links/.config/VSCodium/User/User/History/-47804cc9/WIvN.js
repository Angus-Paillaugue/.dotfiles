import mysql from "mysql2/promise";
import { format } from "date-fns";

const pool = mysql.createPool({
  host: 'mysql',
  user: 'zalando',
  password: 'zalando',
  database: 'zalando',
});

export async function createDatabase() {
  const connection = await pool.getConnection();
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS prices (
        productId VARCHAR(255),
        price DECIMAL(10, 2),
        date DATETIME
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        productId VARCHAR(255),
        url TEXT,
        imageUrl TEXT,
        title TEXT,
        brand TEXT,
        tracked BOOLEAN DEFAULT 1,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } finally {
    connection.release();
  }
}

export async function addProductToDb(
  productId,
  productUrl,
  imageUrl,
  productTitle,
  productBrand,
) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      `
      INSERT IGNORE INTO products (productId, url, imageUrl, title, brand)
      VALUES (?, ?, ?, ?, ?)
      `,
      [productId, productUrl, imageUrl, productTitle, productBrand]
    );
    return true;
  } catch (err) {
    console.error(`Error tracking product: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function insertPriceToDb(productId, price) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      `
      INSERT INTO prices (productId, price, date)
      VALUES (?, ?, ?)
      `,
      [productId, price, format(new Date(), "yyyy-MM-dd HH:mm:ss")]
    );
    return true;
  } catch (err) {
    console.error(`Error tracking product: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function fetchStalePrices() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT
        p.productId,
        pr.url,
        p.price,
        p.date
      FROM prices p
      JOIN products pr ON pr.productId = p.productId
      WHERE (p.productId, p.date) IN (
        SELECT productId, MAX(date) FROM prices GROUP BY productId
      )
      AND pr.tracked = 1
      GROUP BY
        p.productId,
        pr.url,
        p.price,
        p.date
      `
    );

    return rows;
  } catch (err) {
    console.error(`Error fetching stale prices: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}

export async function getPriceHistory(productId, startDate) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT
        DATE(prices.date) AS date,
        MIN(prices.price) AS min_price
      FROM prices
      WHERE prices.productId = ?
      AND prices.date > ?
      GROUP BY DATE(prices.date)
      ORDER BY DATE(prices.date) DESC
      `,
      [productId, startDate]
    );

    const rowsDict = rows.map((row) => ({
      price: row.min_price,
      date: new Date(row.date),
    }));

    return rowsDict;
  } catch (err) {
    console.error(`Error fetching price history: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function updateTrackingStatus(productId, tracked) {
  const connection = await pool.getConnection();
  try {
    await connection.execute(
      `
      UPDATE products
      SET tracked = ?
      WHERE productId = ?
      `,
      [tracked, productId]
    );
    return true;
  } catch (err) {
    console.error(`Error updating tracking status: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function getProductFromUrl(url) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT productId FROM products WHERE url = ?
      `,
      [url]
    );
    return rows.length ? rows[0].productId : null;
  } catch (err) {
    return null;
  } finally {
    connection.release();
  }
}

export async function productExistsInDb(productId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT productId FROM products WHERE productId = ?
      `,
      [productId]
    );
    return rows.length > 0;
  } catch (err) {
    return false;
  } finally {
    connection.release();
  }
}

export async function getLatestPrice(productId) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT price FROM prices WHERE productId = ? ORDER BY date DESC LIMIT 1
      `,
      [productId]
    );
    return { price: rows[0].price };
  } catch (err) {
    return null;
  } finally {
    connection.release();
  }
}

export async function getProducts() {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT
        products.imageUrl,
        products.title,
        products.brand,
        products.tracked,
        products.url,
        products.productId,
        (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1) AS lastPrice,
        COALESCE(
          (SELECT price FROM prices
           WHERE productId = products.productId
           AND price != (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1)
           ORDER BY date DESC LIMIT 1),
          (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1)
        ) AS lastChangedPrice,
        products.createdAt
      FROM products
      LEFT JOIN prices ON products.productId = prices.productId
      GROUP BY
        products.imageUrl,
        products.title,
        products.brand,
        products.tracked,
        products.url,
        products.productId,
        products.createdAt
      ORDER BY products.createdAt DESC
      `
    );

    const productData = rows.map((row) => {
      const { lastPrice, lastChangedPrice } = row;
      const priceDiff =
        lastPrice !== null && lastChangedPrice !== null
          ? lastPrice - lastChangedPrice
          : 0;
      return { ...row, priceDiff };
    });

    return productData;
  } catch (err) {
    console.error(`Error fetching products: ${err}`);
    return [];
  } finally {
    connection.release();
  }
}


export async function getProduct(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT
        products.productId,
        products.url,
        products.imageUrl,
        products.title,
        products.brand,
        products.tracked,
        (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1) AS price,
        COALESCE(
          (SELECT price FROM prices
           WHERE productId = products.productId
           AND price != (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1)
           ORDER BY date DESC LIMIT 1),
          (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1)
        ) AS lastChangedPrice,
        (SELECT MIN(price) as allTimeMinPrice FROM prices WHERE productId = products.productId) AS allTimeMinPrice,
        (SELECT MAX(price) as allTimeMaxPrice FROM prices WHERE productId = products.productId) AS allTimeMaxPrice
      FROM products
      WHERE products.productId = ?
      `,
      [id]
    );

    return rows.length ? rows[0] : null;
  } catch (err) {
    console.error(`Error getting product: ${err}`);
    return null;
  } finally {
    connection.release();
  }
}

export async function deleteProduct(id) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute(
      `
      DELETE FROM products WHERE productId = ?
      `,
      [id]
    );

    await connection.execute(
      `
      DELETE FROM prices WHERE productId = ?
      `,
      [id]
    );

    await connection.commit();
    return true;
  } catch (err) {
    await connection.rollback();
    console.error(`Error deleting product: ${err}`);
    return false;
  } finally {
    connection.release();
  }
}

export async function getPriceChange(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT
        (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1) AS price,
        COALESCE(
          (SELECT price FROM prices
           WHERE productId = products.productId
           AND price != (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1)
           ORDER BY date DESC LIMIT 1),
          (SELECT price FROM prices WHERE productId = products.productId ORDER BY date DESC LIMIT 1)
        ) AS lastChangedPrice
      FROM prices, products
      WHERE products.productId = ?
      ORDER BY prices.date DESC
      `,
      [id]
    );

    return rows.length ? { price: rows[0].price, lastChangedPrice: rows[0].lastChangedPrice } : null;
  } catch (err) {
    return null;
  } finally {
    connection.release();
  }
}

export async function cronHasPriceChange(id) {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(
      `
      SELECT
        prices.price
      FROM prices
      WHERE prices.productId = ?
      ORDER BY prices.date DESC
      LIMIT 2
      `,
      [id]
    );

    if (rows.length < 2 || rows[0].price === rows[1].price) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  } finally {
    connection.release();
  }
}
