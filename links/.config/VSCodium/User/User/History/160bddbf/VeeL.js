import { json } from '@sveltejs/kit';
import ivm from 'isolated-vm';
import { createConnection } from '$lib/server/db'; // Assume this function fetches tests from the database

export async function POST({ request }) {
  const { exercise_id, user_input } = await request.json();

  const db = await createConnection();
  const [tests] = await db.query(
    `SELECT input, expected_output FROM exercise_tests WHERE exercise_id = ?`,
    [exercise_id]
  );
  db.end();

  // Create an isolated VM
  const isolate = new ivm.Isolate({ memoryLimit: 128 });
  const context = await isolate.createContext();
  const jail = context.global;
  await jail.set('global', jail.derefInto());

  // Inject user code into the VM
  try {
    const script = await isolate.compileScript(`
      ${user_input}
      global.userFunction = (typeof sum !== 'undefined') ? sum : (typeof multiply !== 'undefined') ? multiply : null;
    `);
    await script.run(context);
  } catch (error) {
    return json({ error: 'Error in user code: ' + error.message });
  }

  // Run tests in the VM
  const results = [];
  for (const test of tests) {
    const { input, expected_output } = test;
    try {
      const resultScript = await isolate.compileScript(`
        global.result = global.userFunction${input.slice(input.indexOf('('))};
      `);
      await resultScript.run(context);
      const result = await context.global.get('result');
      results.push({
        input,
        expected_output,
        result: result.toString(),
        passed: result.toString() === expected_output
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

  return json({ results });
}
