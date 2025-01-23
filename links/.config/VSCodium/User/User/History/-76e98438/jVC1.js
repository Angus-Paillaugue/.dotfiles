import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { id } = params;
	const db = await createConnection();
	try {
    // TODO : List exercises in learning path and their completion status
		const [path] = await db.query(
			`
      SELECT
        lp.id AS learning_path_id,
        lp.name AS learning_path_name,
        lp.description AS learning_path_description,
        e.id AS exercise_id,
        e.title AS exercise_title,
        e.description AS exercise_description,
        e.difficulty AS exercise_difficulty,
        e.created_at AS exercise_created_at,
        IF(s.id IS NOT NULL, TRUE, FALSE) AS is_completed
    FROM
        learning_paths lp
    LEFT JOIN
        exercises e ON lp.id = e.learning_path_id
    LEFT JOIN
        submissions s ON e.id = s.exercise_id AND s.user_id = ?
    WHERE
        lp.id = ?;
      `,
			[id]
		);
    console.log(path[0]);

		return { path: path[0] };
	} finally {
		db.end();
	}
}
