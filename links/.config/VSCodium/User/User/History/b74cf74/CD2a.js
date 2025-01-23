import db from './index';
import { eq, sql, and } from 'drizzle-orm';
import { exercises, exerciseTests, languages, submissions } from './schema';
import { compileMarkdown } from '$lib/server/markdown';

export async function getExerciseTests(exerciseId) {
	return await db
		.select({
			input: exerciseTests.input,
			expected_output: exerciseTests.expected_output,
			language: languages.name
		})
		.from(exerciseTests)
		.join(exercises, eq(exerciseTests.exercise_id, exercises.id))
		.join(languages, eq(exercises.language_id, languages.id))
		.where(eq(exerciseTests.exercise_id, exerciseId));
}

export async function createExercise({
	title,
	description,
	content,
	difficulty,
	tests,
	languageId
}) {
	const newExercise = await db
		.insert(exercises)
		.values({ title, description, content, difficulty, language_id: languageId })
		.$returningId();
	const newExerciseId = newExercise.id;
	for (const test of tests) {
		await db.insert(exerciseTests).values({
			exercise_id: newExerciseId,
			input: test.input,
			expected_output: test.expected_output
		});
	}
	return newExerciseId;
}

export async function updateExercise({ id, title, description, content, difficulty, tests }) {
	await db
		.update(exercises)
		.set({ title, description, content, difficulty })
		.where(eq(exercises.id, id));
	await db.delete(exerciseTests).where(eq(exerciseTests.exercise_id, id));
	for (const test of tests) {
		await db
			.insert(exerciseTests)
			.values({ exercise_id: id, input: test.input, expected_output: test.expected_output });
	}
}

// Used for tests
export async function getExerciseData(exerciseId) {
	const exerciseData = await db
		.select({
			exercise_id: exercises.id,
			title: exercises.title,
			slug: exercises.slug,
			description: exercises.description,
			content: exercises.content,
			difficulty: exercises.difficulty,
			created_at: exercises.created_at,
			tests: sql`JSON_ARRAYAGG(
      JSON_OBJECT('input', ${exerciseTests.input}, 'expected_output', ${exerciseTests.expected_output})
    )`
		})
		.from(exercises)
		.leftJoin(exerciseTests, eq(exercises.id, exerciseTests.exercise_id))
		.where(eq(exercises.id, exerciseId))
		.groupBy(
			exercises.id,
			exercises.title,
			exercises.slug,
			exercises.description,
			exercises.content,
			exercises.difficulty,
			exercises.created_at
		);

	if (exerciseData.length === 0) {
		throw new Error('Exercise not found');
	}

	return exerciseData[0];
}

export async function getLatestExercises(userId) {
	const latestExercises = await db
		.selectDistinct({
			exercise_id: exercises.id,
			title: exercises.title,
			slug: exercises.slug,
			description: exercises.description,
			difficulty: exercises.difficulty,
			created_at: exercises.created_at,
			language: languages.name,
			solved: sql`CASE WHEN ${submissions.completed_at} IS NOT NULL THEN TRUE ELSE FALSE END`
		})
		.from(exercises)
		.leftJoin(
			submissions,
			sql`${exercises.id} = ${submissions.exercise_id} AND ${submissions.user_id} = ${userId}`
		)
		.leftJoin(languages, eq(exercises.language_id, languages.id))
		.orderBy(exercises.created_at, 'desc');

	latestExercises.forEach((exercise) => {
		exercise.created_at = exercise.created_at.toISOString();
	});

	return latestExercises;
}

export async function getRandomExercise() {
	const [exercise] = await db.query('SELECT * FROM exercises ORDER BY RAND() LIMIT 1');
	return exercise[0];
}

export async function getExerciseDetails(userId, exerciseId, slug) {
	// Fetch the post by its identifier
	let exercise;

	if (exerciseId) {
		const exercises = await db
			.select({
				exercise_id: exercises.id,
				title: exercises.title,
				description: exercises.description,
				slug: exercises.slug,
				content: exercises.content,
				difficulty: exercises.difficulty,
				created_at: exercises.createdAt,
				language: languages.name,
				tests: sql`
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'input', ${exerciseTests.input},
                            'expected_output', ${exerciseTests.expectedOutput},
                            'display_value', ${exerciseTests.displayValue}
                        )
                    )
                    FROM ${exerciseTests}
                    WHERE ${exerciseTests.exerciseId} = ${exercises.id}
                )
            `.as('tests'),
				submissions: sql`
                IF(
                    COUNT(${submissions.id}) > 0,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'submission_id', ${submissions.id},
                            'submission', ${submissions.submission},
                            'completed_at', ${submissions.completedAt},
                            'ram_usage', ${submissions.ramUsage}
                        )
                    ),
                    JSON_ARRAY()
                )
            `.as('submissions')
			})
			.from(exercises)
			.leftJoin(
				submissions,
				and(eq(submissions.exerciseId, exercises.id), eq(submissions.userId, userId))
			)
			.leftJoin(languages, eq(exercises.languageId, languages.id))
			.where(eq(exercises.id, exerciseId))
			.groupBy(
				exercises.id,
				exercises.title,
				exercises.description,
				exercises.content,
				exercises.difficulty,
				exercises.createdAt
			);

		if (exercises.length > 0) {
			exercise = exercises[0];

			// Sort submissions by completed_at DESC
			exercise.submissions.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));

			// Parse the exercise description from MD into html
			exercise.description = await compileMarkdown(exercise.description);
		}
	}

	// If the identifier is a slug, fetch the post by its slug
	if (!exercise) {
		const exercises = await db
			.select({
				exercise_id: exercises.id,
				title: exercises.title,
				description: exercises.description,
				slug: exercises.slug,
				content: exercises.content,
				difficulty: exercises.difficulty,
				created_at: exercises.createdAt,
				language: languages.name,
				tests: sql`
                (
                    SELECT JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'input', ${exerciseTests.input},
                            'expected_output', ${exerciseTests.expectedOutput},
                            'display_value', ${exerciseTests.displayValue}
                        )
                    )
                    FROM ${exerciseTests}
                    WHERE ${exerciseTests.exerciseId} = ${exercises.id}
                )
            `.as('tests'),
				submissions: sql`
                IF(
                    COUNT(${submissions.id}) > 0,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'submission_id', ${submissions.id},
                            'submission', ${submissions.submission},
                            'completed_at', ${submissions.completedAt},
                            'ram_usage', ${submissions.ramUsage}
                        )
                    ),
                    JSON_ARRAY()
                )
            `.as('submissions')
			})
			.from(exercises)
			.leftJoin(
				submissions,
				and(eq(submissions.exerciseId, exercises.id), eq(submissions.userId, userId))
			)
			.where(eq(exercises.slug, slug))
			.groupBy(
				exercises.id,
				exercises.title,
				exercises.description,
				exercises.content,
				exercises.difficulty,
				exercises.createdAt
			);

		if (exercises.length > 0) {
			exercise = exercises[0];

			// Sort submissions by completed_at DESC
			exercise.submissions.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));

			// Parse the exercise description from MD into html
			exercise.description = await compileMarkdown(exercise.description);
		} else {
			throw new Error(404, 'Exercise not found');
		}
	}
}
