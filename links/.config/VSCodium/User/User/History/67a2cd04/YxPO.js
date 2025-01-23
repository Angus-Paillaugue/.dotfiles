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
				COUNT(e.id) AS total_exercises
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
