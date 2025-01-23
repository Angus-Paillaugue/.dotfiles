import * as schema from './schema';
import { eq, sql } from 'drizzle-orm';
import db from './index';

export async function getLearningPath(userId, learningPathId) {
	return await db
		.select({
			id: schema.learningPaths.id,
			name: schema.learningPaths.name,
			description: schema.learningPaths.description,
			exercises: sql`JSON_ARRAYAGG(
    JSON_OBJECT(
      'id', ${schema.exercises.id},
      'slug', ${schema.exercises.slug},
      'title', ${schema.exercises.title},
      'difficulty', ${schema.exercises.difficulty},
      'is_completed', IF(${schema.submissions.id} IS NOT NULL, TRUE, FALSE)
    )
  )`
		})
		.from(schema.learningPaths)
		.leftJoin(schema.exercises, eq(schema.learningPaths.id, schema.exercises.learning_path_id))
		.leftJoin(
			db
				.select({
					latest_submission_id: schema.submissions.id,
					exercise_id: schema.submissions.exercise_id,
					completed_at: schema.submissions.completed_at
				})
				.from(schema.submissions)
				.innerJoin(
					db
						.select({
							latest_id: sql`MAX(${schema.submissions.id})`
						})
						.from(schema.submissions)
						.where(eq(schema.submissions.user_id, userId))
						.groupBy(schema.submissions.exercise_id)
						.as('latest_sub'),
					eq(schema.submissions.id, sql`latest_sub.latest_id`)
				)
				.as('s'),
			eq(schema.exercises.id, sql`s.exercise_id`)
		)
		.where(eq(schema.learningPaths.id, learningPathId))
		.groupBy(schema.learningPaths.id, schema.learningPaths.name, schema.learningPaths.description);
}
