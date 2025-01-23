import moment from 'moment';

export function formatDate(date) {
	if (typeof date !== 'object') {
		date = new Date(date);
	}
	return moment(date).utcOffset(0).format('DD/MM/YY');
}

export function formatPrice(p, c, locale = 'de-FR') {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: c
	}).format(p);
}


export async function extractProductId(url) {
	url = sliceUrl(url);
	const pathComponents = url.split('/').pop().split('.')[0];
	const productId = pathComponents.split('-').slice(-2).join('-');

	return productId;
}

export function sliceUrl(url) {
	return url.split('?')[0];
}

export function isUrlValid(url) {
	// Regex pattern to match any zalando domain
	const pattern = /^(https?:\/\/)?(www\.)?zalando\.\w+/;

	// Check if the URL matches the pattern
	return pattern.test(url);
}
