import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const db = await createConnection();
  const problemsList = (
		await db.query(`
      SELECT
          p.id AS problem_id,
          p.title,
          p.difficulty,
          GROUP_CONCAT(pc.category SEPARATOR ', ') AS categories,
          COUNT(s.id) AS submission_count
      FROM
          Problems p
      LEFT JOIN
          ProblemCategoryLinks pcl ON p.id = pcl.problem_id
      LEFT JOIN
          ProblemCategories pc ON pcl.category_id = pc.id
      LEFT JOIN
          Submissions s ON p.id = s.problem_id
      GROUP BY
          p.id
      ORDER BY
          p.created_at DESC;
    `)
	)[0];
	return { problemsList  };
}
