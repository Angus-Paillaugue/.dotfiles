import PocketBase from 'pocketbase';
import { PUBLIC_POCKETBASE_HOST_URL, PUBLIC_DEV_POCKETBASE_HOST_URL } from '$env/static/public';
import { dev } from '$app/environment';

/**
 * Creates a new instance of PocketBase.
 * @returns {PocketBase} The newly created instance.
 */
export function createInstance() {
	return new PocketBase(dev ? PUBLIC_DEV_POCKETBASE_HOST_URL : PUBLIC_POCKETBASE_HOST_URL);
}

export const pb = createInstance();
