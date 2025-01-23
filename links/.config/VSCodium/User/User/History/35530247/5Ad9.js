import db from '$lib/server/db';

export async function getAllUsersProperties(id) {
  const [properties] = await db.query('SELECT * FROM properties WHERE user_id = ?', [id]);
  return properties;
}
