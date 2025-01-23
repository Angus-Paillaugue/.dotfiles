import { sql } from '@vercel/postgres';
import { extractProductId } from '$lib/utils';
import { firstScrape } from '$lib/scraper';

/** @type {import('./$types').PageServerLoad} */
export async function load() {

	const { rows } = await sql`
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
	return { products: rows };
}


/** @type {import('./$types').Actions} */
export const actions = {
	trackProduct: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { url } = formData;
		const productId = await extractProductId(url);
		const { rows } = await sql`SELECT productId FROM products WHERE productId = ${productId}`;
		if (rows.length > 0) {
			return { message: 'Product already tracked', productData: rows[0] };
		}
		const productData = await firstScrape(url);
		if (!productData) {
			return { message: 'Failed to track the product' };
		}
		productData.productId = productId;
		const priceDb = await sql`INSERT INTO prices (productId, price) VALUES (${productId}, ${productData.lastPrice})`;
		const productDb = await sql`
			INSERT INTO products (productId, url, imageUrl, title, brand)
			VALUES (${productId}, ${url}, ${productData.imageUrl}, ${productData.title}, ${productData.brand})
		`;
		if (priceDb && productDb) {
			return { success: true, message: 'Product tracked successfully', data: productData };
		} else {
			return { message: 'Failed to track the product' };
		}
	}
};
