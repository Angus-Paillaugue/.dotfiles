import { json } from '@sveltejs/kit';
import { runTests } from '$lib/server/tests';

export async function POST({ request }) {
	const { exercise_id, user_input } = await request.json();

	console.log('Running tests for exercise:', exercise_id);

	const results = await runTests(exercise_id, user_input);

	return json(results);
}
