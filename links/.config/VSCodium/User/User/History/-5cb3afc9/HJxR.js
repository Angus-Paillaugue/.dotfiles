import { json } from '@sveltejs/kit';
import { createConnection } from '$lib/server/db';
import isolatedVm from 'isolated-vm';

export async function POST({ request }) {
	const { exerciseId, userInput } = await request.json();
	console.log(exerciseId, userInput);
	
	const db = await createConnection();
	// Step 3: Fetch the tests for the given exercise ID
	const tests = await db.query(
		`SELECT input, expected_output FROM exercise_tests WHERE exercise_id = ?`,
		[exerciseId]
	);

	// Step 4: Run the tests
	const results = [];
	const isolate = new isolatedVm.Isolate();
	const context = isolate.createContextSync();
	const script = isolate.compileScriptSync(userInput);
	const testResults = [];
	for (const test of tests) {
		const input = test.input;
		const expectedOutput = test.expected_output;
		const result = await script.run(context, {
			timeout: 5000,
			reference: {
				input,
				expectedOutput
			}
		});
		const output = result.getSync('output').value;
		const passed = output === expectedOutput;
		testResults.push({ input, output, expectedOutput, passed });
	}
	db.end();

	// Step 5: Return the results
	return json(results);
}
