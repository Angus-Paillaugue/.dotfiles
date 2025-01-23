import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	try {
		const [paths] = await db.query(
			`
			SELECT
				lp.id,
				lp.name,
				lp.description,
				COUNT(DISTINCT s.exercise_id) AS solved_exercises,
				COUNT(DISTINCT e.id) AS total_exercises
			FROM
				learning_paths lp
			LEFT JOIN
				exercises e ON lp.id = e.learning_path_id
			LEFT JOIN
				submissions s ON e.id = s.exercise_id AND s.user_id = ?
			GROUP BY
				lp.id, lp.name, lp.description;
      `,
			[user.id]
		);
		return { paths };
	} finally {
		db.end();
	}
}
[
	{
		id: 1,
		name: 'JavaScript Basics',
		description: 'Learn the basics of javascript.',
		solved_exercises: 14,
		total_exercises: 14
	},
	{
		id: 2,
		name: 'Python Basics',
		description: 'Learn the basics of python.',
		solved_exercises: 4,
		total_exercises: 4
	},
	{
		id: 11,
		name: 'Test Path',
		description: 'This is a test path',
		solved_exercises: 0,
		total_exercises: 0
	}
];
