import { getUserItems } from '$lib/db/item';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { user }}) {
  const items = await getUserItems({ user });
  return { items };
};
