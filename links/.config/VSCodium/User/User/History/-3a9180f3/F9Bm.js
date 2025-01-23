import { createInstance } from '$lib/db';

/**
 * Handles the incoming request and performs necessary operations.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.event - The event object containing the request details.
 * @param {Function} options.resolve - The resolve function to continue processing the request.
 * @returns {Promise<Object>} A promise that resolves to the processed event object.
 */
export const handle = async ({ event, resolve }) => {
	const { locals } = event;
	const pb = createInstance();

	locals.pb = pb;

	return await resolve(event);
};
