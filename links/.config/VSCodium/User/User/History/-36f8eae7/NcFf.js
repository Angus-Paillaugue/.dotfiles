import { json } from '@sveltejs/kit';
import { createConnection } from '$lib/server/db';

export async function POST({ request, locals }) {
	const { title, description, category, difficulty, tests, startValue } = await request.json();
	const { user } = locals;
	if(!user.admin) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	if(!title || !description || !category || !difficulty || !tests || !startValue) {
		return json({ message: 'Missing required fields' }, { status: 400 });
	}

	const db = await createConnection();
	const result = await db.query(
		'INSERT INTO exercises (title, description, category, difficulty, tests, startValue) VALUES (?, ?, ?, ?, ?, ?)',
		[title, description, category, difficulty, tests, startValue]
	);

	return json({ message: 'Exercise created successfully' });
}
