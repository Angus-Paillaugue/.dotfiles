import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
  const { user } = locals;
  const { id } = params;
	const db = await createConnection();
	try {
    // TODO : List exercises in learning path and their completion status
		const [path] = await db.query(
			`
      SELECT
    lp.id,
    lp.name,
    lp.description,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', e.id,
            'title', e.title,
            'description', e.description,
            'difficulty', e.difficulty,
            'created_at', e.created_at,
            'is_completed', IF(s.id IS NOT NULL, TRUE, FALSE)
        )
    ) AS exercises
FROM
    learning_paths lp
LEFT JOIN
    exercises e ON lp.id = e.learning_path_id
LEFT JOIN
    submissions s ON e.id = s.exercise_id AND s.user_id = ?
WHERE
    lp.id = ?
GROUP BY
    lp.id, lp.name, lp.description;

      `,
			[user.id, id]
		);
		return { path: path[0] };
	} finally {
		db.end();
	}
}
