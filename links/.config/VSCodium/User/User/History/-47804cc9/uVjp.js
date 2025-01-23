import pg from 'pg';
const { Pool } = pg;
import { sql } from "@vercel/postgres";

const pool = new Pool({
  connectionString: "postgres://default:FvitsP0lCy8D@ep-autumn-surf-a2nwwzaf-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
})

import { format } from 'date-fns';

export async function createDatabase() {
  const client = await pool.connect();
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS prices (
        productId VARCHAR(255),
        price DECIMAL(10, 2),
        date TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        productId VARCHAR(255),
        url TEXT,
        imageUrl TEXT,
        title TEXT,
        brand TEXT,
        tracked BOOLEAN DEFAULT TRUE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  } finally {
    client.release();
  }
}

export async function addProductToDb(
  productId,
  productUrl,
  imageUrl,
  productTitle,
  productBrand,
) {
  const client = await pool.connect();
  try {
    await client.query(
      `
      INSERT INTO products (productId, url, imageUrl, title, brand)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (productId) DO NOTHING
      `,
      [productId, productUrl, imageUrl, productTitle, productBrand]
    );
    return true;
  } catch (err) {
    console.error(`Error tracking product: ${err}`);
    return false;
  } finally {
    client.release();
  }
}

export async function insertPriceToDb(productId, price) {
  const client = await pool.connect();
  try {
    await client.query(
      `
      INSERT INTO prices (productId, price, date)
      VALUES ($1, $2, $3)
      `,
      [productId, price, format(new Date(), "yyyy-MM-dd HH:mm:ss")]
    );
    return true;
  } catch (err) {
    console.error(`Error tracking product: ${err}`);
    return false;
  } finally {
    client.release();
  }
}

export async function fetchStalePrices() {
  const client = await pool.connect();
  try {
    const res = await client.query(
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
      AND pr.tracked = TRUE
      GROUP BY
        p.productId,
        pr.url,
        p.price,
        p.date
      `
    );

    return res.rows;
  } catch (err) {
    console.error(`Error fetching stale prices: ${err}`);
    return [];
  } finally {
    client.release();
  }
}

export async function getPriceHistory(productId, startDate) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT
        DATE(prices.date) AS date,
        MIN(prices.price) AS min_price
      FROM prices
      WHERE prices.productId = $1
      AND prices.date > $2
      GROUP BY DATE(prices.date)
      ORDER BY DATE(prices.date) DESC
      `,
      [productId, startDate]
    );

    const rowsDict = res.rows.map((row) => ({
      price: row.min_price,
      date: new Date(row.date),
    }));

    return rowsDict;
  } catch (err) {
    console.error(`Error fetching price history: ${err}`);
    return false;
  } finally {
    client.release();
  }
}

export async function updateTrackingStatus(productId, tracked) {
  const client = await pool.connect();
  try {
    await client.query(
      `
      UPDATE products
      SET tracked = $1
      WHERE productId = $2
      `,
      [tracked, productId]
    );
    return true;
  } catch (err) {
    console.error(`Error updating tracking status: ${err}`);
    return false;
  } finally {
    client.release();
  }
}

export async function getProductFromUrl(url) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT productId FROM products WHERE url = $1
      `,
      [url]
    );
    return res.rows.length ? res.rows[0].productId : null;
  } catch (err) {
    return null;
  } finally {
    client.release();
  }
}

export async function productExistsInDb(productId) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT productId FROM products WHERE productId = $1
      `,
      [productId]
    );
    return res.rows.length > 0;
  } catch (err) {
    return false;
  } finally {
    client.release();
  }
}

export async function getLatestPrice(productId) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT price FROM prices WHERE productId = $1 ORDER BY date DESC LIMIT 1
      `,
      [productId]
    );
    return { price: res.rows[0].price };
  } catch (err) {
    return null;
  } finally {
    client.release();
  }
}

export async function getProducts() {
  const client = await pool.connect();
  try {
    const res = await client.query(
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

    const productData = res.rows.map((row) => {
      const { lastprice, lastchangedprice } = row;
      const priceDiff =
        lastprice !== null && lastchangedprice !== null
          ? lastprice - lastchangedprice
          : 0;
      return { ...row, priceDiff };
    });

    return productData;
  } catch (err) {
    console.error(`Error fetching products: ${err}`);
    return [];
  } finally {
    client.release();
  }
}

export async function getProduct(id) {
  const client = await pool.connect();
  try {
    const res = await client.query(
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
      WHERE products.productId = $1
      `,
      [id]
    );

    return res.rows.length ? res.rows[0] : null;
  } catch (err) {
    console.error(`Error getting product: ${err}`);
    return null;
  } finally {
    client.release();
  }
}

export async function deleteProduct(id) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `
      DELETE FROM products WHERE productId = $1
      `,
      [id]
    );

    await client.query(
      `
      DELETE FROM prices WHERE productId = $1
      `,
      [id]
    );

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(`Error deleting product: ${err}`);
    return false;
  } finally {
    client.release();
  }
}

export async function getPriceChange(id) {
  const client = await pool.connect();
  try {
    const res = await client.query(
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
      WHERE products.productId = $1
      ORDER BY prices.date DESC
      `,
      [id]
    );

    return res.rows.length ? { price: res.rows[0].price, lastChangedPrice: res.rows[0].lastchangedprice } : null;
  } catch (err) {
    return null;
  } finally {
    client.release();
  }
}

export async function cronHasPriceChange(id) {
  const client = await pool.connect();
  try {
    const res = await zql
      `
      SELECT
        prices.price
      FROM prices
      WHERE prices.productId = ${id}
      ORDER BY prices.date DESC
      LIMIT 2
      ` ;

    if (res.rows.length < 2 || res.rows[0].price === res.rows[1].price) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  } finally {
    client.release();
  }
}
