import db from './index';
import { eq } from 'drizzle-orm';
import * as schema from './schema';


export async function submitSolution(userId, exercise_id, user_input, results) {
	const solutionExists = await db
		.select({
			id: schema.submissions.id
		})
		.from(schema.submissions)
		.where(
			eq(schema.submissions.user_id, userId),
			eq(schema.submissions.exercise_id, exercise_id),
			eq(schema.submissions.submission, user_input)
		);

	if (solutionExists.length > 0) {
		return { error: 'You already submitted this solution!' };
	}

	const insertedRowId = await db.insert(schema.submissions).values({
		user_id: userId,
		exercise_id: exercise_id,
		submission: user_input,
		ram_usage: results.averageRamUsage,
		completed_at: new Date()
	}).$returningId();

  return insertedRowId;
}
