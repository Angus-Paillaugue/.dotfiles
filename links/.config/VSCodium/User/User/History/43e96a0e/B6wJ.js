import { BASE_API_PORT } from '$lib/constants';
import { error } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const res = await fetch(
		url.protocol + '//' + url.hostname + ':' + BASE_API_PORT + '/product/getAll'
	);
	const data = await res.json();
	if (data.success) return { products: data.data };
	else throw new error(500, { message: data.message });
}
