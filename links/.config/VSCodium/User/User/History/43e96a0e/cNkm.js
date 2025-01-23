import { sql } from '@vercel/postgres';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const products = await sql`
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
		`;
		console.log(products);
	return { products };
}
