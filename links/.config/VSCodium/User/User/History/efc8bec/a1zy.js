import axios from 'axios';
import cheerio from 'cheerio';
import { URL } from 'url';
import { insertPriceToDb } from './database.js';
import { extractProductId } from './utils.js';

export async function firstScrape(url) {
	try {
		const response = await axios.get(url);
		if (response.status === 200) {
			const $ = cheerio.load(response.data);
			const metaTag = $('meta[name="twitter:data1"]').attr('content');
			const productTitle = $('h1 > span').text();
			const productBrand = $('a > span > h3').text();
			const productImageMeta = $('meta[property="og:image"]').attr('content');

			if (metaTag && productTitle && productImageMeta) {
				const productImageURLComponent = new URL(productImageMeta, productImageMeta);
				const productImageURL = productImageURLComponent.origin + productImageURLComponent.pathname;
				const match = metaTag.trim().match(/([\d.,]+)\s*(\D+)/);

				if (match) {
					const price = parseFloat(match[1].replace(',', '.')); // Convert comma to dot for decimal values
					return {
						lastPrice: price,
						imageUrl: productImageURL,
						title: productTitle,
						priceDiff: 0,
						brand: productBrand
					};
				}
			}
		}
	} catch (error) {
		console.error(`Error during firstScrape: ${error.message}`);
	}
	return null;
}

// Internal function: do not call directly
async function scrapeProduct(url) {
	try {
		const response = await axios.get(url);
		if (response.status === 200) {
			const $ = cheerio.load(response.data);
			const metaTag = $('meta[name="twitter:data1"]').attr('content');
			if (metaTag) {
				const match = metaTag.trim().match(/([\d.,]+)\s*(\D+)/);

				if (match) {
					const price = parseFloat(match[1].replace(',', '.')); // Convert comma to dot for decimal values
					return price;
				}
			}
		}
	} catch (error) {
		console.error(`Error during scraping of the product data: ${error.message}`);
	}
	return null;
}

export async function fetchProductPrice(url) {
	const productId = await extractProductId(url);
	const priceInfo = await scrapeProduct(url);
	if (priceInfo) {
		const price = priceInfo;
		// Insert or update the price in the database
		await insertPriceToDb(productId, price);
		return { price };
	} else {
		return null;
	}
}
