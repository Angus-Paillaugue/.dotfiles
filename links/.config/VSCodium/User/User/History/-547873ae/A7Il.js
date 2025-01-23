import { learningPaths, exercises, submissions } from './schema';
import { eq, sql } from 'drizzle-orm';
import db from './index';

export async function getLearningPaths(userId) {
	const learningPathsValue = await db
		.select({
			id: learningPaths.id,
			name: learningPaths.name,
			description: learningPaths.description,
			solved_exercises: sql`COUNT(DISTINCT ${submissions.exercise_id})`,
			total_exercises: sql`COUNT(DISTINCT ${exercises.id})`,
			last_update: sql`MAX(${submissions.completed_at})`
		})
		.from(learningPaths)
		.leftJoin(exercises, eq(learningPaths.id, exercises.learning_path_id))
		.leftJoin(
			submissions,
			sql`${exercises.id} = ${submissions.exercise_id} AND ${submissions.user_id} = ${userId}`
		)
		.groupBy(learningPaths.id, learningPaths.name, learningPaths.description)
		.orderBy(sql`last_update`, 'desc');

	return learningPathsValue;
}

export async function getLearningPath(userId, learningPathId) {
	return await db
		.select({
			id: learningPaths.id,
			name: learningPaths.name,
			description: learningPaths.description,
			exercises: sql`JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', ${exercises.id},
      'slug', ${exercises.slug},
      'title', ${exercises.title},
      'difficulty', ${exercises.difficulty},
      'is_completed', IF(${submissions.id} IS NOT NULL, TRUE, FALSE)
    )
  )`
		})
		.from(learningPaths)
		.leftJoin(exercises, eq(learningPaths.id, exercises.learning_path_id))
		.leftJoin(
			db
				.select({
					latest_submission_id: submissions.id,
					exercise_id: submissions.exercise_id,
					completed_at: submissions.completed_at
				})
				.from(submissions)
				.innerJoin(
					db
						.select({
							latest_id: sql`MAX(${submissions.id})`
						})
						.from(submissions)
						.where(eq(submissions.user_id, userId))
						.groupBy(submissions.exercise_id)
						.as('latest_sub'),
					eq(submissions.id, sql`latest_sub.latest_id`)
				)
				.as('s'),
			eq(exercises.id, sql`s.exercise_id`)
		)
		.where(eq(learningPaths.id, learningPathId))
		.groupBy(learningPaths.id, learningPaths.name, learningPaths.description);
}
