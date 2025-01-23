import { getAllUsersProperties } from '$lib/server/db/properties';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  const { user: {id:userId} } = locals;
  const properties = await getAllUsersProperties(userId);
  return { properties };
};
