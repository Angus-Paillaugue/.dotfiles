import { json } from '@sveltejs/kit';
import { runTests } from '$lib/server/tests';
import { createConnection } from '$lib/server/db';

export async function POST({ request }) {
	const { exercise_id, user_input } = await request.json();

	const results = await runTests(exercise_id, user_input);

	// Some tests failed
	if (results.some((result) => !result.passed))
		return json({ error: 'Some tests failed' }, { status: 400 });

	const db = await createConnection();
	await db.query(`
		INSERT INTO submissions (exercise_id, submission)
		VALUES (?, ?)
	`, [exercise_id, user_input]);

	return json({ message: 'All tests passed', passed: true, results });
}
