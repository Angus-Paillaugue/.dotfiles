import { json } from '@sveltejs/kit';
import { createConnection } from '$lib/server/db';

export async function POST({ request, locals }) {
	const { title, description, category, difficulty, tests, content } = await request.json();
	const { user } = locals;
	if(!user.admin) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	if (!title || !description || !category || !difficulty || !tests || !content) {
		return json({ message: 'Missing required fields' }, { status: 400 });
	}

	const db = await createConnection();
	const [newExercise] = await db.query(
		'INSERT INTO exercises (title, description, content, difficulty) VALUES (?, ?, ?, ?)',
		[title, description, content, difficulty]
	);
	const newExerciseId = newExercise.insertId;
	for(const test of tests) {
		await db.query(
			'INSERT INTO exercise_tests (exercise_id, input, expected_output) VALUES (?, ?, ?)',
			[newExerciseId, category]
		);
	}

	return json({ message: 'Exercise created successfully' });
}
