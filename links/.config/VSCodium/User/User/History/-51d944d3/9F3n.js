import { json } from '@sveltejs/kit';
import { compile } from 'mdsvex';
import highlighter from '$lib/codeHighlighter';

export async function POST({ request }) {
	const { exercise_id, user_input } = await request.json();

	const results = await runTests(exercise_id, user_input);

	return json(results);
}
