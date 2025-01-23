import { json } from '@sveltejs/kit';
import { getLearningPath } from '$lib/server/db/learning_paths';

export async function POST({ request, locals }) {
	const { user } = locals;
	const { id: learningPathId } = await request.json();
	if (!learningPathId) {
		return json({ error: 'Invalid path id' }, { status: 400 });
	}

	const db = await createConnection();
	try {
		const path = getLearningPath(user.id, learningPathId);

		return {
			path
		};
	} catch (err) {
		return json({ error: err.message }, { status: 500 });
	}
}
