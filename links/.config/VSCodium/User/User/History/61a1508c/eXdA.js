import db from '$lib/server/db';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const { id: propertyId } = params;
  const [events] = await db.query('SELECT * FROM events WHERE propertyId = ?', [propertyId]);
  return {events};
};
