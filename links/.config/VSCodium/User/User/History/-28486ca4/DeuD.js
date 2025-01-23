import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const db = await createConnection();
  const [latestExercises] = await db.query(`
    SELECT
        e.id AS exercise_id,
        e.title,
        e.description,
        e.difficulty,
        e.created_at,
        c.name AS category_name,
        uep.status,
        uep.completed_at
    FROM
        exercises e
    LEFT JOIN
        categories c ON e.category = c.name
    LEFT JOIN
        user_exercise_progress uep ON e.id = uep.exercise_id AND uep.user_id = ? -- Replace with the actual user ID
    ORDER BY
        e.created_at DESC
    LIMIT 10;
  `);
	return { latestExercises  };
}
