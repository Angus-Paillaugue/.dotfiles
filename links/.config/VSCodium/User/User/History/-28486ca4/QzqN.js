import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const { user } = locals;
	const db = await createConnection();
  const [latestExercises] = await db.query(
		`
    SELECT
      e.id AS exercise_id,
      e.title,
      e.description,
      e.difficulty,
      e.created_at,
      cat.name AS category_name,
      uep.status,
      uep.completed_at
    FROM
      exercises e
    LEFT JOIN
      user_exercise_progress uep ON e.id = uep.exercise_id AND uep.user_id = ?
    LEFT JOIN
      categories cat ON e.category_id = cat.id
    ORDER BY
      e.created_at DESC;
  `,
		[user.id]
	);
  db.end();
	return { latestExercises  };
}
