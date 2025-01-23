import { createConnection } from '$lib/server/db';
import { redirect } from '$lib/server/redirect';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const db = await createConnection();
  const [exercise] = await db.query('SELECT * FROM exercises ORDER BY RAND() LIMIT 1');
  const randomExercise = exercise[0];
  throw new Error("");
}
