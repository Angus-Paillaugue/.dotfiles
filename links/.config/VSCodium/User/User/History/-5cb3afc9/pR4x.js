import { json } from '@sveltejs/kit';
import { createConnection } from '$lib/server/db';
import isolatedVm from 'isolated-vm';

export async function POST({ request }) {
	const { exercise_id, user_input } = await request.json();

	const db = await createConnection();
	// Step 3: Fetch the tests for the given exercise ID
	const tests = await db.query(
		`SELECT input, expected_output FROM exercise_tests WHERE exercise_id = ?`,
		[exercise_id]
	);
	
	db.end();

	// Step 5: Return the results
	return json(results);
}
