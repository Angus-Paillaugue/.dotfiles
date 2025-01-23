import db from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  const [events ] = await db.query('SELECT * FROM events WHERE propertyId = ?', [params.id]);
    return {};
};
