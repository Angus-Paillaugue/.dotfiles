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

	const isolate = new ivm.Isolate({ memoryLimit: 128 });
	const context = await isolate.createContext();
	const jail = context.global;
	await jail.set('global', jail.derefInto());

	// Run tests in the VM
	const results = [];
	for (const test of tests) {
		const { input, expected_output } = test;
		try {
			const resultScript = await isolate.compileScript(`${user_input}\n${input}`);
			const result = await resultScript.run(context);
			console.log(resultScript, result);

			results.push({
				input,
				expected_output,
				result,
				passed: result === expected_output
			});
		} catch (error) {
			results.push({
				input,
				expected_output,
				error: error.message,
				passed: false
			});
		}
	}

	await context.release();
	await isolate.dispose();

	return json(results);
}
