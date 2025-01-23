import db from './index';
import { eq, sql, and } from 'drizzle-orm';
import { exercises, exerciseTests, languages, submissions } from './schema';

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

import { compileMarkdown } from '$lib/server/markdown';

}



export async function getRandomExercise() {
	const [exercise] = await db.query('SELECT * FROM exercises ORDER BY RAND() LIMIT 1');
	return exercise[0];
}
