import { json } from '@sveltejs/kit';
import { runTests } from '$lib/server/tests';
import { createConnection } from '$lib/server/db';

export async function POST({ request, locals }) {
	const { user } = locals;
	const { exercise_id, user_input } = await request.json();

	const results = await runTests(exercise_id, user_input);
	console.log(results);


	// Some tests failed
	if (results.results.some((result) => !result.passed))
		return json({ message: 'Some tests failed', results }, { status: 400 });

	const { averageRamUsage, averageExecutionTime } = results;

	const db = await createConnection();
	const [solutionExists] = await db.query(
		`
		SELECT id FROM submissions
		WHERE user_id = ? AND exercise_id = ? AND submission = ? AND ram_usage = ? AND execution_time = ?
	`,
		[user.id, exercise_id, user_input, averageRamUsage, averageExecutionTime]
	);

	if (solutionExists.length > 0)
		return json({ message: 'You already submitted this solution!', results }, { status: 400 });

	const [insertedRow] = await db.query(
		`
		INSERT INTO submissions (user_id, exercise_id, submission)
		VALUES (?, ?, ?)
	`,
		[user.id, exercise_id, user_input]
	);

	return json({
		message: 'All tests passed',
		passed: true,
		results,
		submission: {
			submission: user_input,
			completed_at: new Date(),
			submission_id: insertedRow.insertId
		}
	});
}
