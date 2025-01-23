import { extractProductId } from '$lib/utils';
import { firstScrape } from '$lib/scraper.js';
import {
	getProducts,
	insertPriceToDb,
	addProductToDb,
	productExistsInDb,
	getLatestPrice
} from '$lib/database.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const rows = await getProducts();
	return { products: rows };
}

/** @type {import('./$types').Actions} */
export const actions = {
	trackProduct: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { url } = formData;
		if (!url) {
			return { message: 'Product URL is required' };
		}

		const productId = await extractProductId(url);
		if (!productId) {
			return { message: 'Failed to extract product ID from the product URL' };
		}

		if (await productExistsInDb(productId)) {
			const productData = await getLatestPrice(productId);
			return { message: 'Product already tracked', productData };
		}

		try {
			const productData = await firstScrape(url);
			if (!productData) {
				return { message: 'Failed to track the product' };
			}

			productData.productId = productId;
			const priceDb = await insertPriceToDb(productId, productData.lastPrice);
			const productDb = await addProductToDb(
				productId,
				url,
				productData.imageUrl,
				productData.title,
				productData.brand
			);

			if (productData && priceDb && productDb) {
				return {
					success: true,
					message: 'Product tracked successfully',
					data: productData
				};
			} else {
				return { message: 'Failed to track the product' };
			}
		} catch (error) {
			console.error(`Error tracking product: ${error}`);
			return { message: 'Internal Server Error' };
		}
	}
};
