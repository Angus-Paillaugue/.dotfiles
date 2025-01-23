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

	// Step 4: Run the tests
	const results = [];
	const isolate = new isolatedVm.Isolate();
	const context = isolate.createContextSync();
	const script = isolate.compileScriptSync(user_input);
	const testResults = [];
	for (const test of tests) {
		const input = test.input;
		const expectedOutput = test.expected_output;
		context.global.setSync('input', input);
		context.global.setSync('expectedOutput', expectedOutput);
		const result = await script.run(context, {
			timeout: 5000
		});
		console.log(result);

		const output = result;
		const passed = output === expectedOutput;
		testResults.push({ input, output, expectedOutput, passed });
	}
	db.end();

	// Step 5: Return the results
	return json(results);
}
