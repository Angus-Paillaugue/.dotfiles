import { getExerciseData } from '$lib/server/db/exercises';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { id: exerciseId } = params;
	try {
		const exercise = await getExerciseData(exerciseId);
		return { exercise };
	} catch (err) {
		console.error(err);
		throw new error(500, { message: 'Failed to load exercise' });
	}
}
