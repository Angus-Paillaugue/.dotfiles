import { redirect } from '@sveltejs/kit';

export async function load({ cookies, locals }) {
	locals.user = undefined;
	cookies.delete('token', { path: '/' });

	throw redirect(303, '/');
} satisfies 
