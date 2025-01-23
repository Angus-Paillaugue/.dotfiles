import { createConnection } from '$lib/server/db';
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
  const { id:exerciseId } = params;
	const { user } = locals;
	const db = await createConnection();
    const [exercise] = await db.query(
			`
        SELECT
            e.id AS exercise_id,
            e.title,
            e.description,
            e.content,
            e.difficulty,
            e.created_at,
            cat.name AS category_name,
            -- Subquery to get tests without duplication
            (SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT('input', et.input, 'expected_output', et.expected_output)
                )
            FROM exercise_tests et
            WHERE et.exercise_id = e.id
            ) AS tests,
            -- Subquery to get submissions ordered by completed_at descending
            IF(
                COUNT(uep.id) > 0,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'submission_id', uep.id,
                        'submission', uep.submission,
                        'completed_at', uep.completed_at
                    ) ORDER BY uep.completed_at DESC
                ),
                JSON_ARRAY()
            ) AS submissions
        FROM
            exercises e
        LEFT JOIN
            submissions uep ON e.id = uep.exercise_id AND uep.user_id = ?
        LEFT JOIN
            categories cat ON e.category_id = cat.id
        WHERE
            e.id = ?
        GROUP BY
            e.id, e.title, e.description, e.content, e.difficulty, e.created_at, cat.name;
    `,
			[user.id, exerciseId]
		);
    db.end();


    if (exercise.length === 0)
        throw new error(404, 'Exercise not found');


  return { exercise: exercise[0] };
}
