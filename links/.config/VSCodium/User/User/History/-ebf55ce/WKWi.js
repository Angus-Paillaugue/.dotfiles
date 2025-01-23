import { deleteUser } from '$lib/server/db/users';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user: { id } } = locals;

	await deleteUser(id);

	throw redirect(303, '/');
}
