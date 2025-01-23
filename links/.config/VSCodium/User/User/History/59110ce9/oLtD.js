import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const { user } = locals;
	const db = await createConnection();
	const problems = (
		await db.query(
			`
      SELECT
        p.id AS problem_id,
        p.title,
        p.difficulty,
        CASE
            WHERE EXISTS (
                SELECT 1
                FROM Submissions s
                WHERE s.problem_id = p.id
                  AND s.user_id = ?
                  AND s.status = 'accepted'
            )
        END AS solved,
        ROUND(
            (SUM(CASE WHEN s.status = 'accepted' THEN 1 ELSE 0 END) / COUNT(s.id)) * 100, 2
        ) AS acceptance_rate
    FROM
        Problems p
    LEFT JOIN
        Submissions s ON p.id = s.problem_id
    GROUP BY
        p.id
    ORDER BY
        p.created_at DESC;
    `,
			[user.id]
		)
	)[0];
	return { problems };
}
