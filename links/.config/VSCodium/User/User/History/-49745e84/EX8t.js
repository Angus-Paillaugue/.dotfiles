import { json } from '@sveltejs/kit';
import { runTests } from '$lib/server/tests';
import { createConnection } from '$lib/server/db';

export async function POST({ request, locals }) {
	const { user } = locals;
	const { exercise_id, user_input } = await request.json();

	const results = await runTests(exercise_id, user_input);

	// Some tests failed
	if (results.some((result) => !result.passed))
		return json({ error: 'Some tests failed', results }, { status: 400 });

	const db = await createConnection();
	const [insertedRow] = await db.query(
		`
		INSERT INTO submissions (user_id, exercise_id, submission)
		VALUES (?, ?, ?)
	`,
		[user.id, exercise_id, user_input]
	);
	console.log(insertedRow);

	return json({
		message: 'All tests passed',
		passed: true,
		results,
		submission: {
			submission: user_input,
			completed_at: new Date(),
			id: insertedRow.insertedId
		}
	});
}
