import { json } from '@sveltejs/kit';
import { createConnection } from '$lib/server/db';
import ivm from 'isolated-vm';

export async function POST({ request }) {
	const { exercise_id, user_input } = await request.json();

	const db = await createConnection();
	const [tests] = await db.query(
		`SELECT input, expected_output FROM exercise_tests WHERE exercise_id = ?`,
		[exercise_id]
	);
	db.end();

	const isolate = new ivm.Isolate({ memoryLimit: 128 }); // 128MB memory limit
	const context = await isolate.createContext();
	const jail = context.global;

	// Set the user solution in the isolated environment
	await jail.set('userSolution', user_input);

	const results = [];

	for (const test of tests) {
		const { input, expected_output } = test;

		// Run the test inside the isolated environment
		try {
			// Execute the test case
			const result = await context.eval(`userSolution(${input})`, {
				timeout: 1000 // 1 second timeout
			});

			// Check if the result matches the expected output
			results.push({
				input,
				expected_output,
				actual_output: result,
				passed: result === expected_output
			});
		} catch (error) {
			results.push({
				input,
				expected_output,
				actual_output: null,
				error: error.message,
				passed: false
			});
		}
	}

	// Clean up
	isolate.dispose();


	return json(results);
}
