/**
 * Checks if a URL starts with a given path.
 *
 * @param {string} url - The URL to check.
 * @param {string|string[]} path - The path or an array of paths to compare with the URL.
 * @returns {boolean} Returns true if the URL starts with the path(s), otherwise returns false.
 */
export function urlStartsWith(url, path) {
	if (!url || !path) return false;
	if (path instanceof Array) return path.some((p) => urlStartsWith(url, p));
	// For the `/` path
	if (path.length === 1) return url.at(-1) === path;

	return url.startsWith(path) || url.startsWith(path + '/');
}

/**
 * Checks if the given email is valid.
 *
 * @param {string} email - The email to be validated.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
export function isValidEmail(email) {
	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
	return emailRegex.test(email);
}

/**
 * Converts a hexadecimal color code to RGB format.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @returns {string} The RGB format of the color code.
 */
export function hexToRgb(hex) {
	// Remove the leading '#' if present
	hex = hex.replace(/^#/, '');

	// Parse the hexadecimal components
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);

	return [r, g, b];
}

/**
 * Calculates the distance between two RGB colors.
 *
 * @param {string} rgb1 - The first RGB color in the format "rgb(x, y, z)".
 * @param {string} rgb2 - The second RGB color in the format "rgb(x, y, z)".
 * @returns {number} The distance between the two RGB colors.
 */
export function rgbDistance(rgb1, rgb2) {
	let rDiff = rgb1[0] - rgb2[0];
	let gDiff = rgb1[1] - rgb2[1];
	let bDiff = rgb1[2] - rgb2[2];

	return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

/**
 * Finds the nearest color name based on the average color.
 *
 * @param {string} averageColor - The average color value.
 * @returns {string} The nearest color name.
 */
export function findNearestColorName(averageColor) {
	const colorObject = {
		red: 'e94749',
		yellow: 'e7b30c',
		green: '22c55e',
		blue: '3b82f6',
		indigo: '6366f1',
		purple: 'a855f7',
		pink: 'eb4999',
		grey: '697585',
		white: 'ffffff',
		black: '000000',
		beige: 'd6b994',
		silver: 'a1a1aa',
		moss: '2a422f'
	};
	// Convert average color to RGB
	let averageRgb = hexToRgb(averageColor);

	// Initialize variables for nearest color name and its distance
	let nearestColorName = Object.keys(colorObject)[0];
	let minDistance = rgbDistance(averageRgb, hexToRgb(colorObject[nearestColorName]));

	// Iterate over each color in the object
	for (let colorName in colorObject) {
		if (colorObject.hasOwnProperty(colorName)) {
			let currentColor = colorObject[colorName];
			let currentRgb = hexToRgb(currentColor);

			// Calculate distance between average color and current color
			let distance = rgbDistance(averageRgb, currentRgb);

			// Update nearest color name if distance is smaller
			if (distance < minDistance) {
				nearestColorName = colorName;
				minDistance = distance;
			}
		}
	}

	return nearestColorName;
}

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Appends strings of classes. If non-truthy values are passed, they are ignored.
 * Uses tailwind-merge to merge tailwind classes.
 */
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

import { PUBLIC_POCKETBASE_HOST_URL, PUBLIC_DEV_POCKETBASE_HOST_URL } from '$env/static/public';
import { dev } from '$app/environment';

/**
 * Returns the URL of an image for a given collection, item, and image name.
 * @param {string} collectionId - The ID of the collection.
 * @param {string} id - The ID of the item.
 * @param {string} image - The name of the image.
 * @returns {string|null} The URL of the image, or null if any of the parameters is missing.
 */
export function getImageUrl(collectionId, id, image) {
	if (!collectionId || !id || !image) return null;
	return `${dev ? PUBLIC_DEV_POCKETBASE_HOST_URL : PUBLIC_POCKETBASE_HOST_URL}/api/files/${collectionId}/${id}/${image}`;
}
