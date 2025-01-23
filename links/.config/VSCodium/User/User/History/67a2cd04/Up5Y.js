import { getLearningPaths } from '$lib/server/db/learning_paths';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	console.log(locals);
	
	const {
		user: { id: userId }
	} = locals;

	const paths = await getLearningPaths(userId);
	return { paths };
}
