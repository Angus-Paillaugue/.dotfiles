import { BASE_API_PORT } from '$lib/constants';
import { error } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
	const products = await sql``;
	if (data.success) return { products: data.data };
	else throw new error(500, { message: data.message });
}
