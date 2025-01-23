import { createConnection } from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals, params }) {
	const { user } = locals;
	const db = await createConnection();
	const problem = (
		await db.query(
			`
            SELECT
                *
            FROM
                Problems
            WHERE
                id = ?;`,
			[params]
		)
	)[0];
	return { problem };
}
