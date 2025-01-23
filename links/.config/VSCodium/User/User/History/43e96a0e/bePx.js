import { sql } from '@vercel/postgres';
import { extractProductId } from '$lib/utils';
import { firstScrape } from '$lib/scraper.js';
import { getProducts } from '$lib/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {

	const rows = await getProducts()
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
