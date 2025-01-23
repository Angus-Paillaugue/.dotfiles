import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const { user } = locals;
  const db = await createConnection();
  const [rank] = await db.query(`
    WITH user_rankings AS (
    SELECT
      u.id AS user_id,
      u.username,
      COUNT(DISTINCT s.exercise_id) AS distinct_exercise_count,
      RANK() OVER (ORDER BY COUNT(DISTINCT s.exercise_id) DESC) AS user_rank
    FROM
      users u
    LEFT JOIN
      submissions s ON u.id = s.user_id
    GROUP BY
      u.id, u.username
  )
  SELECT
    user_rankings.user_id,
    user_rankings.username,
    user_rankings.distinct_exercise_count,
    user_rankings.user_rank
  FROM
    user_rankings
  WHERE
    user_id = ?;
  `, [user.id]);
  console.log(rank[0]);

  return { rank: rank[0], user };
}
