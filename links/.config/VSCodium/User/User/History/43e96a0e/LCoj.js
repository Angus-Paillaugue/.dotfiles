import { extractProductId } from '$lib/utils';
import { firstScrape } from '$lib/scraper.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const rows = await locals.pb.collection('products').getFullList();
	return { products: rows };
}

/** @type {import('./$types').Actions} */
export const actions = {
	trackProduct: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData());
		const { url } = formData;
		if (!url) {
			return { message: 'Product URL is required' };
		}

		const productId = await extractProductId(url);
		if (!productId) {
			return { message: 'Failed to extract product ID from the product URL' };
		}

		if (await locals.pb.collection('products').getList(1, 1, { filter: `id='${productId}'` })) {
			const productData = await locals.pb
				.collection('products')
				.getList(1, 1, { filter: `id='${productId}'`, expand: 'prices' });
			productData;
			return { message: 'Product already tracked', productData };
		};

		try {
			const productData = await firstScrape(url);
			if (!productData) {
				return { message: 'Failed to track the product' };
			}

			productData.productId = productId;
			const priceDb = await locals.pb.collection('prices').insertOne({
				productId: productId,
				price: productData.lastPrice
			});
			const productDb = await locals.pb.collection('products').insertOne({
				productId: productId,
				url: url,
				imageUrl: productData.imageUrl,
				title: productData.title,
				brand: productData.brand
			});

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
